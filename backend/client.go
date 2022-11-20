package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Client struct {
	server *Server
	conn   *websocket.Conn
	send   chan []byte
}

type Message struct {
	Message  string
	Type     string
	ClientID string
}

func (c *Client) read() {
	defer func() {
		c.server.unregister <- c
		c.conn.Close()
	}()
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			log.Printf("Error reading message: %v", err)
			break
		}

		fmt.Print("Reading message: ")
		fmt.Println(string(message))
		c.server.broadcast <- message
	}
}

func (c *Client) write() {
	defer func() {
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			fmt.Print("Writing message: ")
			fmt.Println(string(message))
			w.Write(message)
			for i := 0; i < len(c.send); i++ {
				//w.Write([]byte("\n"))
				w.Write(<-c.send)
			}
		}

	}
}

func serveWs(server *Server, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection: %v", err)
		return
	}

	client := &Client{server, conn, make(chan []byte, 256)}
	client.server.register <- client
	client.send <- []byte("Hello from the server")

	go client.write()
	go client.read()
}
