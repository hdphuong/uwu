export interface Payload {
    Type: "init" | "message" | "cursor";
    Contents: string;
    ClientID?: string;
  }

class Client {
    socket: WebSocket;
    messages: Payload[] = [];
    clientID: string = '';

    constructor () {
        this.socket = new WebSocket('ws://localhost:8080/ws');
        this.socket.onmessage = (msg) => {
            const message : Payload = JSON.parse(msg.data);
            console.log(message);
            if (message.Type === "init") {
                if (this.clientID === '' ){
                    this.clientID = message.Contents;
                }
            } else {
                this.messages.push(message);
                console.log("on message", msg);
            }
        }
        this.socket.onopen = () => {
            console.log("on open", 'WebSocket Client Connected');
        };
        this.socket.onclose = (event) => {
            console.log("Socket Closed Connection: ", event);
        };
        
        this.socket.onerror = (error) => {
            console.log("Socket Error: ", error);
        };
    }

    private prepareMessage (message: string) {
        const payload : Payload = {Contents: message, Type: "message", ClientID: this.clientID};
        this.messages.push(payload);
        return JSON.stringify(payload);
    }
    
    public sendToServer = (msg: string) => {
        this.socket.send(this.prepareMessage(msg));
        console.log("sent message", msg);
        console.log(this.socket?.readyState);
    }

    public sendCursorToServer = (x: number, y: number) => {
        const payload : Payload = {Contents: `${x},${y}`, Type: "cursor", ClientID: this.clientID};
        this.socket.send(JSON.stringify(payload));
    }
}

export default Client;