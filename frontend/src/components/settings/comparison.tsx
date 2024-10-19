// src/components/settings/Comparison.tsx
import React from "react";
import { SettingsProps } from "../../types";
import SettingsSection from "../SettingsSection";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Dropdown from "../ui/dropdown";
import Checkbox from "../ui/checkbox";

export default function Comparison({ settings, updateSettings }: SettingsProps) {
    const comparisonMethods = ['MD5', 'SHA-1', 'SHA-256', 'Byte-by-byte'];

    const handleChange = (key: string, value: any) => {
        updateSettings({ ...settings, [key]: value });
    };

    return (
        <div className="space-y-6">
            <SettingsSection title="Comparison Method">
                <Dropdown
                    label="Comparison method"
                    options={comparisonMethods}
                    selectedOption={settings.comparisonMethod}
                    onSelect={(value) => handleChange('comparisonMethod', value)}
                    width={100}
                />
            </SettingsSection>

            <SettingsSection title="Comparison Options">
                <div className="space-y-2">
                    <Checkbox
                        label="Consider file creation/modification date"
                        checked={settings.considerDate}
                        onChange={(checked) => handleChange('considerDate', checked)}
                    />
                    <Checkbox
                        label="Compare file metadata (EXIF for images, ID3 for audio)"
                        checked={settings.compareMetadata}
                        onChange={(checked) => handleChange('compareMetadata', checked)}
                    />
                    <Checkbox
                        label="Ignore file extensions when comparing"
                        checked={settings.ignoreExtensions}
                        onChange={(checked) => handleChange('ignoreExtensions', checked)}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Advanced Comparison">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="fuzzyTolerance">Fuzzy matching tolerance for similar filenames (%)</Label>
                        <Input
                            id="fuzzyTolerance"
                            type="number"
                            min="0"
                            max="100"
                            value={settings.fuzzyTolerance}
                            onChange={(e) => handleChange('fuzzyTolerance', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Label htmlFor="similarityThreshold">Custom similarity threshold for content comparison (%)</Label>
                        <Input
                            id="similarityThreshold"
                            type="number"
                            min="0"
                            max="100"
                            value={settings.similarityThreshold}
                            onChange={(e) => handleChange('similarityThreshold', Number(e.target.value))}
                        />
                    </div>
                </div>
            </SettingsSection>
        </div>
    );
}