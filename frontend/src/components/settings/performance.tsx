// src/components/settings/Performance.tsx
import React from "react";
import { SettingsProps } from "../../types";
import SettingsSection from "../SettingsSection";
import {Input} from "../ui/input";
import Checkbox from "../ui/checkbox";
import Dropdown from "../ui/dropdown";

export default function Performance({ settings, updateSettings }: SettingsProps) {
    const diskIOPriorities = ['Background', 'Foreground'];

    const handleChange = (key: string, value: any) => {
        updateSettings({ ...settings, [key]: value });
    };

    return (
        <div className="space-y-6">
            <SettingsSection title="Scan Performance">
                <div className="space-y-4">
                    <Input
                        label="Number of simultaneous scan threads"
                        type="number"
                        min="1"
                        value={settings.scanThreads}
                        onChange={(e) => handleChange('scanThreads', Number(e.target.value))}
                    />
                    <Input
                        label="Buffer size for file reading (KB)"
                        type="number"
                        min="1"
                        value={settings.bufferSize}
                        onChange={(e) => handleChange('bufferSize', Number(e.target.value))}
                    />
                    <Input
                        label="Limit CPU usage percentage"
                        type="number"
                        min="0"
                        max="100"
                        value={settings.cpuUsageLimit}
                        onChange={(e) => handleChange('cpuUsageLimit', Number(e.target.value))}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="File Handling">
                <div className="space-y-2">
                    <Checkbox
                        label="Use memory-mapped files for large file comparisons"
                        checked={settings.useMemoryMappedFiles}
                        onChange={(checked) => handleChange('useMemoryMappedFiles', checked)}
                    />
                    <Dropdown
                        label="Disk I/O priority"
                        options={diskIOPriorities}
                        selectedOption={settings.diskIOPriority}
                        onSelect={(value) => handleChange('diskIOPriority', value)}
                        width={100}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Caching">
                <Checkbox
                    label="Cache scan results for faster subsequent scans"
                    checked={settings.cacheScanResults}
                    onChange={(checked) => handleChange('cacheScanResults', checked)}
                />
            </SettingsSection>
        </div>
    );
}