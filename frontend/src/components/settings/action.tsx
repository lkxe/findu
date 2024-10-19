import React from "react";
import { SettingsProps } from "../../types";
import SettingsSection from "../SettingsSection";
import { Button } from "../ui/button";
import Dropdown from "../ui/dropdown";
import Checkbox from "../ui/checkbox";
import {Input} from "../ui/input";

export default function Action({ settings, updateSettings }: SettingsProps) {
    const defaultActions = ['Delete', 'Move', 'Symlink'];

    const handleChange = (key: string, value: any) => {
        updateSettings({ ...settings, [key]: value });
    };

    return (
        <div className="space-y-6">
            <SettingsSection title="Default Action">
                <Dropdown
                    label="Default action for duplicates"
                    options={defaultActions}
                    selectedOption={settings.defaultAction}
                    onSelect={(value) => handleChange('defaultAction', value)}
                    width={100}
                />
            </SettingsSection>

            <SettingsSection title="Action Options">
                <div className="space-y-2">
                    <Checkbox
                        label="Confirm before deleting/moving files"
                        checked={settings.confirmBeforeAction}
                        onChange={(checked) => handleChange('confirmBeforeAction', checked)}
                    />
                    <Checkbox
                        label="Create log file for all actions taken"
                        checked={settings.createActionLog}
                        onChange={(checked) => handleChange('createActionLog', checked)}
                    />
                    <Checkbox
                        label="Preserve folder structure when moving duplicates"
                        checked={settings.preserveFolderStructure}
                        onChange={(checked) => handleChange('preserveFolderStructure', checked)}
                    />
                </div>
            </SettingsSection>

            <SettingsSection title="Move Options">
                <div className="space-y-4">
                    <Input
                        label="Move duplicates to folder"
                        value={settings.moveToFolder}
                        onChange={(e) => handleChange('moveToFolder', e.target.value)}
                    />
                    <Button onClick={() => {/* Implement folder selection */}}>
                        Browse
                    </Button>
                </div>
            </SettingsSection>

            <SettingsSection title="File Protection">
                <Checkbox
                    label="Enable file protection to prevent accidental deletion"
                    checked={settings.enableFileProtection}
                    onChange={(checked) => handleChange('enableFileProtection', checked)}
                />
            </SettingsSection>
        </div>
    );
}