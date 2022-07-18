import { Dispatch } from "redux";
import { chatApi, ChatMessageApiType, StatusType } from "../api/chatApi";
import { v1 } from 'uuid';

type ChatMessageType = ChatMessageApiType & { id: string };

type initialStateType = {
    messages: ChatMessageType[];
    status: StatusType;
}

export enum ChatActionTypes {
    MESSAGES_RECEIVED = 'MESSAGES_RECEIVED',
    STATUS_CHANGED = 'STATUS_CHANGED',
    REMOVE_MESSAGES = 'REMOVE_MESSAGES',
}

type MessagesReceivedActionType = {
    type: ChatActionTypes.MESSAGES_RECEIVED;
    payload: ChatMessageApiType[];
}

type StatusChanedActionType = {
    type: ChatActionTypes.STATUS_CHANGED;
    payload: string
}

type RemoveMessageActionType = {
    type: ChatActionTypes.REMOVE_MESSAGES;
}

export type ChatAction = MessagesReceivedActionType 
| StatusChanedActionType
| RemoveMessageActionType
;


const initialState: initialStateType = {
    messages: [],
    status: 'pending',
}
export type InitialStateType = typeof initialState;



const chatReducer = (state = initialState, action: ChatAction): InitialStateType => {
    switch (action.type) {
        case ChatActionTypes.MESSAGES_RECEIVED:
            // const newItems = action.payload === state.messages ? {...state, messages: [...state.messages]} 
            // :  {...state, messages: [...state.messages, ]};


            return {
                ...state,
                messages: [...state.messages, ...action.payload.map(m => ({ ...m, id: v1() }))].filter((m, index, array) => index >= array.length - 100)
            }
        case ChatActionTypes.STATUS_CHANGED:
            return {
                ...state,
                status: action.payload as StatusType
            }
        case ChatActionTypes.REMOVE_MESSAGES:
            return {
                ...state,
                messages: []
            }
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageApiType[]): ChatAction => ({
        type: ChatActionTypes.MESSAGES_RECEIVED,
        payload: messages
    }),
    statusChanged: (status: StatusType): ChatAction => ({
        type: ChatActionTypes.STATUS_CHANGED,
        payload: status
    }),
    removeMessages: (): ChatAction => ({
        type: ChatActionTypes.REMOVE_MESSAGES,
    }),
}


let _newMessageHandler: ((messages: ChatMessageApiType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch<ChatAction>) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
};

let _statuschangedHandler: ((status: StatusType) => void) | null = null;
const _statuschangedHandlerCreator = (dispatch: Dispatch<ChatAction>) => {
    if (_statuschangedHandler === null) {
        _statuschangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statuschangedHandler
};

export const startMessagesListening = () => async (dispatch: Dispatch<ChatAction>) => {
    chatApi.start();
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', _statuschangedHandlerCreator(dispatch))
}

export const stopMessagesListening = () => async (dispatch: Dispatch<ChatAction>) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', _statuschangedHandlerCreator(dispatch))
    chatApi.stop();
}

export const sendMessage = (message: string) => async (dispatch: Dispatch<ChatAction>) => {
    chatApi.sendMessage(message)
}



export default chatReducer;



