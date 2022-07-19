import { Box, Button, Container, List, TextField } from '@mui/material'
import React, { FC } from 'react'
import { ChatMessageType, StatusType } from '../../store/api/chatApi';
import Message from './Message'

type PropsType = {
    messages: ChatMessageType[];
    status: StatusType;
}

const Messages: FC<PropsType> = ({ messages, status }) => {
    const [isAutoScroll, setIsAutoScroll] = React.useState(true);
    const messagesAnchorRef = React.useRef<HTMLDivElement>(null);

    const scrollHandler = (e: React.UIEvent) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    React.useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' })
        }
    }, [messages])

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 1000,
                height: '100%',
                maxHeight: 500,
                bgcolor: 'background.paper',
                overflow: 'auto'
            }}
            onScroll={scrollHandler}
        >
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            <div ref={messagesAnchorRef}></div>
        </List>
    )
}

export default Messages