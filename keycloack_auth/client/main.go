package main

import (
	"net/http"
	"context"
	"log"
	"encoding/json"
	"golang.org/x/oauth2"
	oidc "github.com/coreos/go-oidc"
)

var (
	clientID = "app"
	clientSecret = "cfbdec7f-8679-45d0-9e35-99edace59659"
)

func main() {
	ctx := context.Background()

	provider, err := oidc.NewProvider(ctx, "http://localhost:8080/auth/realms/demo")

	if err != nil {
		log.Fatal(err)
	}

	config := oauth2.Config {
		ClientID: clientID,
		ClientSecret: clientSecret,
		Endpoint: provider.Endpoint(),
		RedirectURL: "http://localhost:8081/auth/callback",
		Scopes: []string{ oidc.ScopeOpenID, "profile", "email", "roles" },
	}

	state := "magica"

	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		http.Redirect(writer, request, config.AuthCodeURL(state), http.StatusFound)
	})

	http.HandleFunc("/auth/callback", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("state") != state {
			http.Error(w, "state did not match", http.StatusBadRequest)
			return
		}

		oauth2Token, err := config.Exchange(ctx, r.URL.Query().Get("code"))
		if err != nil {
			http.Error(w, "failed to exchange token", http.StatusBadRequest)
			return
		}

			
		rawIDToken, ok := oauth2Token.Extra("id_token").(string)
		if !ok {
			http.Error(w, "failed to exchange token", http.StatusBadRequest)
			return
		}

		resp := struct {
				OAuth2Token *oauth2.Token
				RawIDToken string
			}{
				oauth2Token, rawIDToken,
			}

		data, err := json.MarshalIndent(resp, "", "		")
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		
		w.Write(data)

			
	})

	log.Fatal(http.ListenAndServe(":8081", nil))
}