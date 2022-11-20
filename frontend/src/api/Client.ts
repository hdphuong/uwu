class Client {
    socket: WebSocket;
    constructor () {
        this.socket = new WebSocket('ws://localhost:8080/ws');
        this.socket.onmessage = (msg) => {
            console.log("on message", msg);
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
        const payload = {Message: message, Type: "message"};
        return JSON.stringify(payload);
    }
    
    public sendToServer = (msg: string) => {
        this.socket.send(this.prepareMessage(msg));
        console.log("sending msg: ", this.prepareMessage(msg));
        console.log(this.socket?.readyState);
    }
}

export default Client;