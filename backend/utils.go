package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func writeResponse(t string, w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-Type", "application/json")
	//w.WriteHeader(http.StatusOK)

	message := &Message{Contents: t, Type: "message", ClientID: "server"}

	b, err := json.Marshal(message)
	if err != nil {
		log.Printf("Error marshalling message: %v", err)
		return
	}
	w.Write([]byte(b))
}
