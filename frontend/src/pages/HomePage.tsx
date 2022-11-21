import Client from '../api/Client';
import { FC, useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import Cursor from '../components/Cursor';
import useMousePosition from '../components/useMousePosition';
import OtherCursors from '../components/OtherCursors';

const HomePage : FC = () => {
    const wsClient = useRef<Client| null>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const { clientX, clientY } = useMousePosition();

    useEffect(() => {
        function cleanup() {
            wsClient.current?.socket.close();
          }
        wsClient.current = new Client();
        return cleanup;
    }, []);

    useEffect(() => {
        if (wsClient.current?.clientID != '') {
            wsClient.current?.sendCursorToServer(clientX, clientY);
        }
    }, [clientX, clientY]);

    if (wsClient.current) {
        wsClient.current.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.Type === 'cursor') {
                console.log(data.Contents);
                const x = data.Contents.split(',')[0];
                const y = data.Contents.split(',')[1];
                setCursor({ x: parseInt(x), y: parseInt(y) });
                console.log(cursor);
            }
        };
    };

    return (
            <div>
                <Cursor/>
                <OtherCursors clientX={cursor.x || 0} clientY={cursor.y || 0}/>
                <h1>Home</h1>
                <Link to="/chat">Chat</Link>
            </div>
    );
};

export default HomePage;