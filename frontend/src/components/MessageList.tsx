import Message from './Message';
import React from 'react';
import Box from '@mui/material/Box';
import { Payload } from '../api/Client';

type ListProps = {
    clientID: string;
    messages: Payload[];
}

const MessageList: React.FC<ListProps>= ({clientID, messages}: ListProps) => {
    return (
        <Box className="messageList" display="flex" flexDirection="column" p={2} width="100%" overflow="auto">
        {messages.map((message) => (
            <Message clientID={clientID} message={message}/>
        ))}
    </Box>
    );
}
export default MessageList;