import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { ChatMessageType } from '../../store/api/chatApi'

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
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
    )
}

export default Message