
import React from 'react';

type Props = {
    message: string;
}
const Message: React.FC<Props> = ( {message} : Props) => {
    return (
        <div className="Message">
            {message}
        </div>
    );
};
export default Message;