package main

import (
	"log"
	"net/http"
)

type Handler struct {
	globalServer *Server
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/ws" {
		serveWs(h.globalServer, w, r)
	} else {
		http.Error(w, "Not found", 404)
	}
}

func main() {
	h := Handler{globalServer: newServer()}
	go h.globalServer.run()

	log.Fatal(http.ListenAndServe(":8080", &h))
}
