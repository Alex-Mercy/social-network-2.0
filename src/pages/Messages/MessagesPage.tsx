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
import { dialogsApi } from '../../store/api/dialogsApi';

const MessagesPage: React.FC = () => {
  const { data} = authApi.useGetIsAuthorizedQuery();
  // const {data: dialogData} = dialogsApi.useGetDialogQuery(23626);
  const {data: dialogData} = dialogsApi.useGetAllDialogsQuery();
  const [startChat, {data: chatDta}] = dialogsApi.useStartChattingMutation();
  const [sendMessage, {data: sendData}] = dialogsApi.useSendMessageMutation();
  const {data: viewedData} = dialogsApi.useGetIsMessageViewedQuery('b5c35fac-e11c-4e19-aaa2-910deafb027a');
  console.log(viewedData);
  
  const [newMessage, setNewMessage] = React.useState<string>('')
  const { dialog } = useAppSelector(state => state.dialogSlice);
  const dispatch = useAppDispatch();
  // const {sendMessage} = dialogSlice.actions;

  const userId = 23626;
  const body = 'sdfhg'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }


  const handleClick = async() => {
    // dispatch(sendMessage({
    //   id: 4,
    //   name: 'Alex',
    //   message: newMessage
    // }));
    // setNewMessage('')
    await startChat(23626)
    sendMessage({body, userId})
  }

  return (
    <>
    {data !== undefined && !data?.id ?
    <Navigate to='/login'/>
    : <Container maxWidth="xl">
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {dialog.map((message) => (
        <div key={message.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="UserAvatar" src={userLogo} />
            </ListItemAvatar>
            <ListItemText
              primary={message.name}
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
    <Stack spacing={3} direction="row">
      <TextField id="outlined-basic" label="New message" variant="outlined" value={newMessage} onChange={handleChange} />
      <Button onClick={handleClick} variant="outlined">Send message</Button>
    </Stack>
  </Container>
  }
    
    </>

  );
}

export default MessagesPage;