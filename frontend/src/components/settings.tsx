import React, { useState } from "react";
import {Settings, Scan, Search, Zap, Play, Database, Hammer} from "lucide-react";
import General from "./settings/general";
import ScanSettings from "./settings/scan";
import Comparison from "./settings/comparison";
import Action from "./settings/action";
import Performance from "./settings/performance";
import Advanced from "./settings/advanced";
import { AppSettings } from "../types";

const submenus = [
    { name: "General", icon: Settings, component: General },
    { name: "Advanced Scan", icon: Scan, component: ScanSettings },
    { name: "Comparison", icon: Search, component: Comparison },
    { name: "Action", icon: Play, component: Action },
    { name: "Performance", icon: Zap, component: Performance },
    {name: "Advanced", icon: Hammer, component: Advanced},
    //{ name: "Advanced", icon: Tool, component: Advanced },
];

interface SettingsPageProps {
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void;
}

export default function SettingsPage({ settings, updateSettings }: SettingsPageProps) {
    const [selectedSubmenu, setSelectedSubmenu] = useState("General");

    const SelectedComponent = submenus.find(
        (submenu) => submenu.name === selectedSubmenu
    )?.component;

    return (
        <div className="flex h-full bg-gray-100">
            <div className="w-64 bg-white shadow-md">
                <nav className="mt-5">
                    {submenus.map((submenu) => (
                        <button
                            key={submenu.name}
                            className={`flex items-center w-full px-6 py-3 text-left ${
                                selectedSubmenu === submenu.name
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedSubmenu(submenu.name)}
                        >
                            <submenu.icon className="w-5 h-5 mr-3" />
                            {submenu.name}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 p-8">
                {SelectedComponent && (
                    <SelectedComponent
                        settings={settings}
                        updateSettings={updateSettings}
                    />
                )}
            </div>
        </div>
    );
}