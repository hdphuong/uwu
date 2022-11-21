interface payload {
    Type: "init" | "message";
    Contents: string;
    ClientID?: string;
  }

class Client {
    socket: WebSocket;
    messages: string[] = [];
    clientID: string = '';

    constructor () {
        this.socket = new WebSocket('ws://localhost:8080/ws');
        this.socket.onmessage = (msg) => {
            const message : payload = JSON.parse(msg.data);
            console.log(message);
            if (message.Type === "init") {
                this.clientID = message.Contents;
            } else {
                this.messages.push(message.Contents);
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
        const payload = {Contents: message, Type: "message", ClientID: this.clientID};
        return JSON.stringify(payload);
    }
    
    public sendToServer = (msg: string) => {
        this.socket.send(this.prepareMessage(msg));
        console.log("sending msg: ", this.prepareMessage(msg));
        console.log(this.socket?.readyState);
    }
}

export default Client;