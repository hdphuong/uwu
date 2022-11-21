import Client from '../api/Client';
import { FC, useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import Cursor from '../components/Cursor';
import useMousePosition from '../components/useMousePosition';
import OtherCursors from '../components/OtherCursors';

const HomePage : FC = () => {
    const wsClient = useRef<Client| null>(null);
    const [cursors, setCursors] = useState<any>({});
    const { clientX, clientY} = useMousePosition();

    useEffect(() => {
        function cleanup() {
            wsClient.current?.socket.close();
          }
        wsClient.current = new Client();
        return cleanup;
    }, []);

    useEffect(() => {
        if (wsClient.current?.clientID !== '') {
            wsClient.current?.sendCursorToServer(clientX, clientY);
        }
    }, [clientX, clientY]);

    if (wsClient.current) {
        wsClient.current.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.Type === 'cursor') {
                const x = data.Contents.split(',')[0];
                const y = data.Contents.split(',')[1];
                const key = data.ClientID;
                setCursors({...cursors, [key] : [parseInt(x), parseInt(y)] });
                console.log(cursors);
            }
        };
    };

    return (
            <div>
                <Cursor/>
                <h1>Home</h1>
                {cursors && Object.keys(cursors).map((key) => (<OtherCursors key={key} clientX={cursors[key][0]} clientY={cursors[key][1]}/>))}
                <Link to="/chat">Chat</Link>
            </div>
    );
};

export default HomePage;