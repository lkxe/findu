import React from "react";
import { SettingsProps } from "../../types";
import SettingsSection from "../SettingsSection";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import FileExtensionList from "../FileExtensionList";
import IgnorePatternList from "../IgnorePatternList";
import Checkbox from "../ui/checkbox";

export default function AdvancedScan({ settings, updateSettings }: SettingsProps) {
    const handleChange = (key: string, value: any) => {
        updateSettings({ ...settings, [key]: value });
    };

    return (
        <div className="space-y-6">
            <SettingsSection title="File Selection">
                <FileExtensionList
                    extensions={settings.fileExtensions}
                    onUpdate={(extensions) => handleChange('fileExtensions', extensions)}
                />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="minFileSize">Minimum file size (KB)</Label>
                        <Input
                            id="minFileSize"
                            type="number"
                            value={settings.minFileSize}
                            onChange={(e) => handleChange('minFileSize', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="maxFileSize">Maximum file size (KB)</Label>
                        <Input
                            id="maxFileSize"
                            type="number"
                            value={settings.maxFileSize}
                            onChange={(e) => handleChange('maxFileSize', Number(e.target.value))}
                        />
                    </div>
                </div>
            </SettingsSection>

            <SettingsSection title="Scan Options">
                <div className="space-y-2">
                    <Checkbox
                        label="Include hidden files and folders"
                        checked={settings.includeHidden}
                        onChange={(checked) => handleChange('includeHidden', checked)}
                    />
                    <Checkbox
                        label="Scan by file content (slower but more accurate)"
                        checked={settings.scanByContent}
                        onChange={(checked) => handleChange('scanByContent', checked)}
                    />
                    <Checkbox
                        label="Include system folders"
                        checked={settings.includeSystemFolders}
                        onChange={(checked) => handleChange('includeSystemFolders', checked)}
                    />
                    <Checkbox
                        label="Scan compressed files (zip, rar, etc.)"
                        checked={settings.scanCompressed}
                        onChange={(checked) => handleChange('scanCompressed', checked)}
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="scanDepth">Recursive folder scanning depth limit</Label>
                    <Input
                        id="scanDepth"
                        type="number"
                        value={settings.scanDepth}
                        onChange={(e) => handleChange('scanDepth', Number(e.target.value))}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Ignore Patterns">
                <IgnorePatternList
                    patterns={settings.ignorePatterns}
                    onUpdate={(patterns) => handleChange('ignorePatterns', patterns)}
                />
            </SettingsSection>
        </div>
    );
}