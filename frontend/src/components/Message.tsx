
import React, { useRef } from 'react';
import Client, {Payload} from '../api/Client';

type Props = {
    clientID: string;
    message: Payload;
}
const Message: React.FC<Props> = ( {clientID, message} : Props) => {

    return (
        <div className="Message">
            {message.ClientID == clientID ? "My" : "Their"}: {message.Contents}
        </div>
    );
};
export default Message;