import Client from '../api/Client';
import React, {FC, useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageList from '../components/MessageList';
import { Payload } from '../api/Client';
import './styles.css'



const ChatPage : FC = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Payload[]>([]);
    const wsClient = useRef<Client| null>(null);
    const [update, setUpdate] = useState(false);
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

    const displayMessages = (messages: Payload[]) => {
        setMessages(messages || []);
    };

    useEffect(() =>{
        console.log("useEffect");
        if (wsClient.current) {
            setMessages(wsClient.current?.messages || []);
        }
    }, [update]);


    if (wsClient.current) {
        wsClient.current.socket.onmessage = (msg) => {
            console.log(msg);
            console.log(wsClient.current?.messages);
            const message : Payload = JSON.parse(msg.data);
            if (message.Type === "init") {
                if (wsClient.current && wsClient.current?.clientID === '' ){
                    wsClient.current.clientID = message.Contents;
                }
            } else {
                if (message.Type === "message") {
                    wsClient.current?.messages.push(message);
                }
            }
            setUpdate(!update);
        };
    }

    return (
        <div className='chat-page'>
            <div className='wrapper'> 
            <div className='messageList'>
                <MessageList clientID={wsClient.current?.clientID || ''} messages={messages || []}/>
            </div>
            <div>
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
                className='messageBox'
                color="secondary"
            />
            <Button 
                variant="contained" 
                endIcon={<SendIcon/>} 
                onClick={sendMessage}
                style={{marginTop: 6, height: 55, fill: "white", backgroundColor: "blueviolet"}}>
                Send
            </Button>
            </div>
            </div>
        </div>
    )
};


export default ChatPage;

function setSeconds(arg0: (seconds: any) => any) {
    throw new Error('Function not implemented.');
}
