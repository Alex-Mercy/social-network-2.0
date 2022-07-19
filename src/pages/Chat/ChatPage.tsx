import * as React from 'react';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { actions, startMessagesListening, stopMessagesListening } from '../../store/reducers/chatReducer';
import { Navigate } from 'react-router-dom';
import { authApi } from '../../store/api/authApi';
import Messages from './Messages';
import AddMessageForm from './AddMessageForm';


const ChatPage: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { data: authData } = authApi.useGetIsAuthorizedQuery();
  const { messages, status } = useAppSelector(state => state.chatReducer);

  React.useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(actions.removeMessages());
    }
  }, [])
  

  return (
    <>
      {authData !== undefined && !authData?.id ?
        <Navigate to='/login' />
        :
        <Container maxWidth="xl">
          {status === 'error' && <div>Some error occured. Please refresh the page</div>}
          <Messages messages={messages} status={status}/>
          <AddMessageForm status={status}/>
        </Container>
      }
    </>

  );
}
)

export default ChatPage;