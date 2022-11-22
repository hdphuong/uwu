
import React from 'react';
import {Payload} from '../api/Client';
import "./styles.css";

type Props = {
    clientID: string;
    message: Payload;
}
const Message: React.FC<Props> = ( {clientID, message} : Props) => {
    const isOwnMessage = clientID === message.ClientID;
    const className = isOwnMessage ? 'my-message' : 'their-message';
    return (
        <div className={className}>
            {message.Contents}
        </div>
    );
};
export default Message;