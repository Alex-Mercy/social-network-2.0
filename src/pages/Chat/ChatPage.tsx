import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { actions, sendMessage, startMessagesListening, stopMessagesListening } from '../../store/reducers/chatReducer';


export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}

const ChatPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const messagesAnchorRef = React.useRef<HTMLDivElement>(null);
  const { messages, status } = useAppSelector(state => state.chatReducer);
  const [message, setMessage] = React.useState('');
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);


  let newMesages = messages;
  React.useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(actions.removeMessages());
      
    }
  }, [])

  React.useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({block: "start", inline: "nearest", behavior: 'smooth'})
    }
  }, [messages])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleClick = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  const scrollHandler = (e: React.UIEvent) => {
    const element = e.currentTarget;
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }
  
  console.log('rendered ChatPage');
  console.log(messages);
  console.log(newMesages);



  return (
    <>
      {/* {!data?.id ? 
    <Navigate to='/login'/>
    :  */}
      {status === 'error' && <div>Some error occured. Please refresh the page</div>}

      <Container maxWidth="xl">
        <List
          sx={{ width: '100%', maxWidth: 1000, height: '100%', maxHeight: 500, bgcolor: 'background.paper', overflow: 'auto' }}
          onScroll={scrollHandler}
        >
          {messages.map((message, index) => (
            <div key={message.id}>
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
          <div ref={messagesAnchorRef}></div>

        </List>
        <Stack spacing={3} direction="row" sx={{ marginTop: 5 }}>
          <TextField id="outlined-basic" label="New message" variant="outlined" value={message} onChange={handleChange} />
          <Button disabled={status !== 'ready'} onClick={handleClick} variant="outlined">Send message</Button>
        </Stack>
      </Container>




      {/* } */}

    </>

  );
}
)

export default ChatPage;