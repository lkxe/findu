package settings

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sync"

	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

type AppSettings struct {
	Language              string   `json:"language"`
	Theme                 string   `json:"theme"`
	Exclusions            []string `json:"exclusions"`
	ScanFileTypes         []string `json:"scanFileTypes"`
	MinimumFileSize       int      `json:"minimumFileSize"`
	IgnoreSystemFolders   bool     `json:"ignoreSystemFolders"`
	ComparisonAlgorithm   string   `json:"comparisonAlgorithm"`
	ConfirmBeforeDeleting bool     `json:"confirmBeforeDeleting"`
}

var (
	settings       AppSettings
	mutex          sync.RWMutex
	configDir      string
	settingsLoaded bool
	bundle         *i18n.Bundle
	localizer      *i18n.Localizer
)

func Init() error {
	var err error
	configDir, err = getConfigDir()
	if err != nil {
		return fmt.Errorf("error getting config directory: %w", err)
	}

	err = os.MkdirAll(configDir, 0755)
	if err != nil {
		return fmt.Errorf("error creating config directory: %w", err)
	}

	bundle = i18n.NewBundle(language.English)

	err = LoadSettings()
	if err != nil {
		return fmt.Errorf("error loading settings: %w", err)
	}

	// Initialize localizer with the loaded language
	localizer = i18n.NewLocalizer(bundle, settings.Language)

	return nil
}

func getConfigDir() (string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("error getting user home directory: %w", err)
	}
	return filepath.Join(homeDir, ".config", "findu"), nil
}

func GetSettings() (AppSettings, error) {
	mutex.RLock()
	defer mutex.RUnlock()

	if !settingsLoaded {
		mutex.RUnlock()
		err := LoadSettings()
		mutex.RLock()
		if err != nil {
			return AppSettings{}, fmt.Errorf("error loading settings: %w", err)
		}
	}

	return settings, nil
}

func LoadSettings() error {
	configPath := filepath.Join(configDir, "config.json")
	data, err := os.ReadFile(configPath)
	if err != nil {
		if os.IsNotExist(err) {
			// If file doesn't exist, create default settings
			settings = AppSettings{
				Language: "en",
				Theme:    "Dark",
			}
			settingsLoaded = true
			return SaveSettings()
		}
		return fmt.Errorf("error reading config file: %w", err)
	}

	err = json.Unmarshal(data, &settings)
	if err != nil {
		return fmt.Errorf("error unmarshaling settings: %w", err)
	}

	settingsLoaded = true
	return nil
}

func SaveSettings() error {
	data, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		return fmt.Errorf("error marshaling settings: %w", err)
	}

	configPath := filepath.Join(configDir, "config.json")
	err = os.WriteFile(configPath, data, 0644)
	if err != nil {
		return fmt.Errorf("error writing config file: %w", err)
	}

	return nil
}

func UpdateSettings(newSettings AppSettings) error {
	mutex.Lock()
	settings = newSettings
	mutex.Unlock()
	return SaveSettings()
}

func SetLanguage(lang string) error {
	mutex.Lock()
	settings.Language = lang
	localizer = i18n.NewLocalizer(bundle, lang)
	mutex.Unlock()
	return SaveSettings()
}

func GetLanguage() string {
	mutex.RLock()
	defer mutex.RUnlock()
	return settings.Language
}

// Translate is a helper function to use i18n
func Translate(id string, templateData map[string]interface{}) string {
	return localizer.MustLocalize(&i18n.LocalizeConfig{
		MessageID:    id,
		TemplateData: templateData,
	})
}
