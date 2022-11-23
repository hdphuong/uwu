package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Position struct {
	x int
	y int
}

type Client struct {
	server   *Server
	conn     *websocket.Conn
	send     chan []byte
	clientID *string
	position *Position
}

type Message struct {
	Contents string
	Type     string
	ClientID string
}

const pingPeriod = 10 * time.Second

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

		var msg Message
		json.Unmarshal(message, &msg)
		if msg.Type == "cursor" {
			var pos Position
			json.Unmarshal([]byte(msg.Contents), &pos)
			c.position = &pos
		}
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
			/*
				w, err := c.conn.NextWriter(websocket.TextMessage)
				if err != nil {
					return
				}
			*/
			c.conn.WriteMessage(websocket.TextMessage, []byte(message))
		}
	}
}

func serveWs(server *Server, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection: %v", err)
		return
	}

	clientID := uuid.New().String()
	client := &Client{server, conn, make(chan []byte, 256), &clientID, nil}
	client.server.register <- client
	message := &Message{Type: "init", ClientID: "server", Contents: clientID}
	b, err := json.Marshal(message)
	if err != nil {
		log.Printf("Error marshalling message: %v", err)
		return
	}
	client.send <- []byte(string(b))

	go client.write()
	go client.read()
}
