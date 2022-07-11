import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import userLogo from '../../assets/images/dev.jpg';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { dialogSlice } from '../../store/reducers/dialogSlice';
import { authApi } from '../../store/api/authApi';
import { Navigate } from 'react-router-dom';




export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}

const ChatPage: React.FC = () => {
  const [wsChannel, setWsChannel] = React.useState<WebSocket | null>(null);
  const { data } = authApi.useGetIsAuthorizedQuery();
  const [newMessage, setNewMessage] = React.useState<string>('')
  const { dialog } = useAppSelector(state => state.dialogSlice);
  const dispatch = useAppDispatch();
  // const {sendMessage} = dialogSlice.actions;

  // React.useEffect(() => {
  //   let ws: WebSocket;
  //   const _closeHandler = () => {

  //   }
  //   function createChannel() {
  //     if (ws !== null) {
  //       ws.removeEventListener('close', _closeHandler)
  //       ws.close();
  //     }
  //     ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  //     wsChannel?.addEventListener('close', _closeHandler);
  //   setWsChannel(ws)
  // }
  // createChannel();
  // return () => {
  //   ws.removeEventListener('close', _closeHandler);
  //   ws.close();
  // }

  // }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }


  // const handleClick = () => {
  //   dispatch(sendMessage({
  //     id: 4,
  //     name: 'Alex',
  //     message: newMessage
  //   }));
  //   setNewMessage('')
  // }

  const [messages, setNewMessages] = React.useState<ChatMessageType[]>([]);
  const [readyStatus, setReadyStatus] = React.useState<'pending' | 'ready'>('pending');

  React.useEffect(() => {
    wsChannel?.addEventListener('message', (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data)
      setNewMessages((prevMessages) => [...prevMessages, ...newMessages])
    })
  }, [wsChannel])

  const sendMessage = () => {
    if (!newMessage) {
      return;
    }
    wsChannel?.send(newMessage);
    setNewMessage('')
  }

  React.useEffect(() => {
    wsChannel?.addEventListener('open', () => {
      setReadyStatus('ready')

    })
  }, [wsChannel])

  return (
    <>
      {/* {!data?.id ? 
    <Navigate to='/login'/>
    :  */}

      <Container maxWidth="xl">
        <List sx={{ width: '100%', maxWidth: 1000, height: '100%', maxHeight: 500, bgcolor: 'background.paper', overflow: 'auto' }}>
          {messages.map((message, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="UserAvatar" src={message.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={message.userName}
                  secondary={
                    <React.Fragment>
                      {message.message}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}

        </List>
        <Stack spacing={3} direction="row" sx={{ marginTop: 5 }}>
          <TextField id="outlined-basic" label="New message" variant="outlined" value={newMessage} onChange={handleChange} />
          <Button disabled={wsChannel ===  null || readyStatus !== 'ready'} onClick={sendMessage} variant="outlined">Send message</Button>
        </Stack>
      </Container>
      {/* } */}

    </>

  );
}

export default ChatPage;