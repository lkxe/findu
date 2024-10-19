package main

import (
	"context"
	"findu/settings"
	"fmt"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetFolder() string {
	dir, _ := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		DefaultDirectory:     "/",
		Title:                "Select Folder",
		CanCreateDirectories: true,
		ShowHiddenFiles:      true,
	})

	return dir
}

func (a *App) GetSettings() (settings.AppSettings, error) {
	s, err := settings.GetSettings()
	if err != nil {
		return settings.AppSettings{}, fmt.Errorf("error getting settings: %w", err)
	}
	return s, nil
}

func (a *App) UpdateSettings(newSettings settings.AppSettings) error {
	return settings.UpdateSettings(newSettings)
}

func (a *App) SetTheme(theme string) error {
	println(theme)
	return settings.SetLanguage(theme)
}

func (a *App) SetLanguage(lang string) error {
	println(lang)
	return settings.SetLanguage(lang)
}

func (a *App) GetLang() string {
	println(settings.GetLanguage())
	return settings.GetLanguage()
}

func (a *App) Translate(messageID string) string {
	lang := settings.GetLanguage()
	localizer := i18n.NewLocalizer(bundle, lang)
	return localizer.MustLocalize(&i18n.LocalizeConfig{MessageID: messageID})
}
