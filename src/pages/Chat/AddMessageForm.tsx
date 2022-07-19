import { Box, Button, TextField } from '@mui/material'
import React, { FC } from 'react'
import { StatusType } from '../../store/api/chatApi';
import { sendMessage } from '../../store/reducers/chatReducer';
import { useAppDispatch } from '../../store/store';

const AddMessageForm: FC<{status: StatusType}> = ({status}) => {
    const [message, setMessage] = React.useState('');
    
    const maxMessageLength = message.length > 100;
    const dispatch = useAppDispatch();

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

  return (
    <Box sx={{ marginTop: 5 }} component="form" onSubmit={onFormSubmit}>
                <TextField
                    sx={{ width: '50%' }}
                    id="outlined-basic"

                    label="New message"
                    variant="outlined"
                    value={message}
                    onChange={handleChange}
                    size="small"
                    error={maxMessageLength}
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
  )
}

export default AddMessageForm