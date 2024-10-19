// src/components/settings/General.tsx
import React from "react";
import { SettingsProps } from "../../types";
import SettingsSection from "../SettingsSection";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import Checkbox from "../ui/checkbox";
import {Input} from "../ui/input";

export default function General({ settings, updateSettings }: SettingsProps) {
    const languages: string[] = ['English', 'German', 'French'];
    const themes: string[] = ['Light', 'Dark', 'System'];

    const handleChange = (key: string, value: any) => {
        updateSettings({ ...settings, [key]: value });
    };

    return (
        <div className="space-y-6">
            <SettingsSection title="Preferences">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Dropdown
                        label="Language"
                        options={languages}
                        selectedOption={settings.language}
                        onSelect={(value) => handleChange('language', value)}
                        width={100}
                    />
                    <Dropdown
                        label="Theme"
                        options={themes}
                        selectedOption={settings.theme}
                        onSelect={(value) => handleChange('theme', value)}
                        width={100}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="defaultFolder">Default folder for quick scans</Label>
                        <div className="flex">
                            <Input
                                id="defaultFolder"
                                value={settings.defaultFolder}
                                onChange={(e: any) => handleChange('defaultFolder', e.target.value)}
                                className="flex-grow"
                            />
                            <Button onClick={() => {/* Implement folder selection */}} className="ml-2">
                                Browse
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 space-y-2">
                    <Checkbox
                        label="Auto-start scan on application launch"
                        checked={settings.autoStartScan}
                        onChange={(checked) => handleChange('autoStartScan', checked)}
                    />
                    <Checkbox
                        label="Show tooltips"
                        checked={settings.showTooltips}
                        onChange={(checked) => handleChange('showTooltips', checked)}
                    />
                    <Checkbox
                        label="Enable automatic updates"
                        checked={settings.enableAutomaticUpdates}
                        onChange={(checked) => handleChange('enableAutomaticUpdates', checked)}
                    />
                </div>
            </SettingsSection>
        </div>
    );
}