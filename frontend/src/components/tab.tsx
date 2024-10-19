// src/components/Tabs.tsx
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

type IconComponent = IconType | LucideIcon;

interface TabProps {
    label: string;
    icon?: IconComponent;
    active: boolean;
    onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, icon: Icon, active, onClick }) => {
    return (
        <button
            className={`px-4 py-2 font-semibold transition-colors duration-150 ease-in-out flex items-center ${
                active
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={onClick}
        >
            {Icon && <Icon className="mr-2 h-5 w-5" />}
            {label}
        </button>
    );
};

interface TabContent {
    label: string;
    icon?: IconComponent;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: TabContent[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex border-b border-gray-200">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        icon={tab.icon}
                        active={index === activeTab}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </div>
            <div className="py-4">{tabs[activeTab].content}</div>
        </div>
    );
};

export default Tabs;