import Client from '../api/Client';
import React, {FC, useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageList from '../components/MessageList';
import { Payload } from '../api/Client';



const ChatPage : FC = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Payload[]>([]);
    const wsClient = useRef<Client| null>(null);
    useEffect(() => {
        function cleanup() {
            wsClient.current?.socket.close();
        }
        wsClient.current = new Client();
        return cleanup;
    }, []);


    const sendMessage = () => {
        wsClient.current?.sendToServer(message);
        setMessage("");
    };

    useEffect(() =>{
        if (wsClient) {
            setMessages(wsClient.current?.messages || []);
        }
    }, [wsClient.current?.socket.onmessage]);

    return (
        <div>
            <h1>Chat</h1>
            <MessageList clientID={wsClient.current?.clientID || ''} messages={messages || []}/>
            <div style={{display:"flex"}}>
            <TextField
                id="filled-textarea"
                label="Enter message"
                value={message}
                variant="filled"
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
                style={{marginInline: 5, height: 80, width: "100%"}}
            />
            <Button 
                variant="contained" 
                endIcon={<SendIcon/>} 
                onClick={sendMessage}
                style={{marginLeft: 0, height: 55}} >
                Send
            </Button>
            </div>
        </div>
    )
};


export default ChatPage;