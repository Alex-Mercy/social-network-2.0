const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

type MessagesReceivedSubscriberType = (messages: ChatMessageApiType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type subscriberType = (messages: ChatMessageApiType[]) => void

export type StatusType = 'pending' | 'ready' | 'error';

export type ChatMessageApiType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}
let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed';

const _closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const _messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach(s => s(newMessages))
}

const _openHandler = () => {
  notifySubscribersAboutStatus("ready");
}

const _errorHandler = () => {
  notifySubscribersAboutStatus("error");
  console.error('Refresh')
}


const cleanup = () => {
  ws?.removeEventListener('close', _closeHandler);
  ws?.removeEventListener('message', _messageHandler);
  ws?.removeEventListener('open', _openHandler);
  ws?.removeEventListener('error', _errorHandler);
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(s => s(status));
}

function createChannel() {
  cleanup();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  notifySubscribersAboutStatus('pending');
  ws?.addEventListener('close', _closeHandler);
  ws?.addEventListener('message', _messageHandler);
  ws?.addEventListener('open', _openHandler);
  ws?.addEventListener('error', _errorHandler);
}

export const chatApi = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanup();
    ws?.close();
  },
  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName].push(callback);
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback) //first type of unsubscribe
    }
  },
  unsubscribe(eventName: EventsNamesType, callback: subscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callback) //second type of unsubscribe
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
} 