import Client from '../api/Client';
import { FC, useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import Cursor from '../components/Cursor';
import useMousePosition from '../components/useMousePosition';

const HomePage : FC = () => {
    const wsClient = useRef<Client| null>(null);
    const [cursors, setCursors] = useState({ active: false });
    const { clientX, clientY } = useMousePosition();

    useEffect(() => {
        function cleanup() {
            wsClient.current?.socket.close();
          }
        wsClient.current = new Client();
        return cleanup;
    }, []);

    wsClient.current?.sendCursorToServer(clientX, clientY);

    return (
            <div>
                <Cursor/>
                <h1>Home</h1>
                <Link to="/chat">Chat</Link>
            </div>
    );
};

export default HomePage;