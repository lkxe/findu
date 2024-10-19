package main

import (
	"embed"
	"findu/settings"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"log"
)

var languageFiles embed.FS

var bundle *i18n.Bundle
var localizer *i18n.Localizer

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	e := settings.Init()
	if e != nil {
		log.Fatalf("Failed to initialize settings: %v", e)
	}
	//loadLanguageFiles()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "findu",
		Width:  1280,
		Height: 820,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Frameless:        true,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		DisableResize:    true,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
