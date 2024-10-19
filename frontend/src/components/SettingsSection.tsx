import React from 'react';

interface SettingsSectionProps {
    title: string;
    children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="bg-white shadow-sm rounded-lg p-6">
                {children}
            </div>
        </div>
    );
};

export default SettingsSection;