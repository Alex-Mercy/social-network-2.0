import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import userLogo from '../../assets/images/dev.jpg';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { dialogSlice } from '../../store/reducers/dialogSlice';
import { authApi } from '../../store/api/authApi';
import { Navigate, useParams } from 'react-router-dom';
import { dialogsApi } from '../../store/api/dialogsApi';

type MessagesPageParams = {
  id: string;
}

const MessagesPage: React.FC = () => {
  const params = useParams<MessagesPageParams>();
  
  const { data } = authApi.useGetIsAuthorizedQuery();
  // const {data: dialogData} = dialogsApi.useGetDialogQuery(23626);
  // const { data: dialogData } = dialogsApi.useGetAllDialogsQuery();
  // const [startChat, { data: chatDta }] = dialogsApi.useStartChattingMutation();
  // const { data: viewedData } = dialogsApi.useGetIsMessageViewedQuery('b5c35fac-e11c-4e19-aaa2-910deafb027a');
  // console.log(viewedData);
  const userId = Number(params.id);

  
  const {data: dialogData} = dialogsApi.useGetDialogQuery(userId);
  const [sendMessage] = dialogsApi.useSendMessageMutation();

  const [newMessage, setNewMessage] = React.useState<string>('')
  const body = newMessage
  const { dialog } = useAppSelector(state => state.dialogSlice);
  const dispatch = useAppDispatch();
  // const {sendMessage} = dialogSlice.actions;
  console.log(dialogData?.totalCount === 0);
  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }


  const handleClick = async () => {
    // dispatch(sendMessage({
    //   id: 4,
    //   name: 'Alex',
    //   message: newMessage
    // }));
    
    // await startChat(23626)
    sendMessage({ body, userId });
    setNewMessage('');
  }

  return (
    <>
      {data !== undefined && !data?.id ?
        <Navigate to='/login' />
        : <Container maxWidth="xl">
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {dialogData?.totalCount === 0 && `You don't have any messages yet`}
            {dialogData?.items.map((message) => (
              <div key={message.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="UserAvatar" src={userLogo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {message.senderName } 
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="overline"
                          color="text.primary"
                        >
                           {' — ' + message.addedAt.slice(0, 10)}
                        </Typography>

                      </React.Fragment>
                    }

                    secondary={
                      <React.Fragment>
                        {message.body}
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