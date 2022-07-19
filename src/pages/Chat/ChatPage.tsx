import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { actions, sendMessage, startMessagesListening, stopMessagesListening } from '../../store/reducers/chatReducer';
import { Link, Navigate } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';


export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}

const ChatPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { data: authData } = authApi.useGetIsAuthorizedQuery();
  const messagesAnchorRef = React.useRef<HTMLDivElement>(null);
  const { messages, status } = useAppSelector(state => state.chatReducer);
  const [message, setMessage] = React.useState('');
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);
  
  const maxMessageLength = message.length > 100;
  

  React.useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(actions.removeMessages());

    }
  }, [])

  React.useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' })
    }
  }, [messages])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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


  return (
    <>
      {authData !== undefined && !authData?.id ?
        <Navigate to='/login' />
        :
        <Container maxWidth="xl">
          {status === 'error' && <div>Some error occured. Please refresh the page</div>}
          <List
            sx={{ width: '100%', maxWidth: 1000, height: '100%', maxHeight: 500, bgcolor: 'background.paper', overflow: 'auto' }}
            onScroll={scrollHandler}
          >
            {messages.map((message, index) => (
              <div key={message.id}>
                <ListItem alignItems="flex-start">
                  <Link to={'/profile/' + message.userId}>
                    <ListItemAvatar>
                      <Avatar alt="UserAvatar" src={message.photo} />
                    </ListItemAvatar>
                  </Link>
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

          <Box sx={{ marginTop: 5 }} component="form" onSubmit={onFormSubmit}>
            <TextField
              sx={{ width: '50%' }}
              id="outlined-basic"

              label="New message"
              variant="outlined"
              value={message}
              onChange={handleChange}
              size="small"
              error = {maxMessageLength}
              helperText={maxMessageLength && "Must be 100 characters or less"}
            />
            <Button
              sx={{ marginLeft: 2 }}
              type="submit"
              disabled={status !== 'ready' || maxMessageLength}
              variant="outlined"
            >
              Send
            </Button>
          </ Box>
        </Container>




      }

    </>

  );
}
)

export default ChatPage;