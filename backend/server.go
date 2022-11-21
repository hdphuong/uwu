package main

import (
	"encoding/json"
	"fmt"
)

type Server struct {
	clients    map[*Client]string
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
}

func newServer() *Server {
	return &Server{
		clients:    make(map[*Client]string),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (s *Server) run() {
	for {
		select {
		case client := <-s.register:
			s.clients[client] = *client.clientID
		case client := <-s.unregister:
			if _, ok := s.clients[client]; ok {
				delete(s.clients, client)
				close(client.send)
			}
		case message := <-s.broadcast:
			// broadcast message to all clients except sender
			var msg Message
			if err := json.Unmarshal(message, &msg); err != nil {
				continue
			}
			fmt.Printf("broadcasting message %s\n", string(message))
			for client := range s.clients {
				if client.clientID != nil && *client.clientID != msg.ClientID {
					client.send <- message
				} else if msg.ClientID == "server" {
					client.send <- message
				}
			}
		}
	}
}
