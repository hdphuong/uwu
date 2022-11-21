import Message from './Message';
import React from 'react';
import Box from '@mui/material/Box';

type ListProps = {
    messages: string[];
}

const MessageList: React.FC<ListProps>= ({messages}: ListProps) => {
    return (
        <Box className="messageList" display="flex" flexDirection="column" p={2} width="100%" overflow="auto">
        {messages.map((message) => (
            <Message message={message}/>
        ))}
    </Box>
    );
}
export default MessageList;