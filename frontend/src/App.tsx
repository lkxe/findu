import React, {useState} from "react";
import {RiScan2Line, RiSearch2Line} from "react-icons/ri";
import {Settings} from "lucide-react";
import {AppSettings, getDefaultSettings} from "./types";
import SettingsPage from "./components/settings";
import Toolbar from "./components/toolbar";
import Tabs from "./components/tab";
import DuplicateTable from "./components/DuplicateTable";
import QuickScan from "./components/home/quickscan";

function App() {
    const [duplicates, setDuplicates] = useState<any[]>([]); // Replace 'any' with your actual duplicate type
    const [settings, setSettings] = useState<AppSettings>({
        ...getDefaultSettings(),
    });

    const handleScanComplete = (results: any[]) => {
        setDuplicates(results);
    };

    const handleSettingsUpdate = (newSettings: AppSettings) => {
        setSettings(newSettings);
        // You might want to save the settings to persistent storage here
    };

    const tabs = [
        {
            label: 'Quick Scan',
            icon: RiScan2Line,
            content: <QuickScan/>,
        },
        {
            label: 'Search',
            icon: RiSearch2Line,
            content: <div>Search functionality coming soon...</div>,
        },
        {
            label: 'Settings',
            icon: Settings,
            content: <SettingsPage settings={settings} updateSettings={handleSettingsUpdate}/>,
        },
    ];

    return (
        <div className="bg-gray-100 w-screen h-screen flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">findu - Duplicate Finder</h1>
                </div>
            </header>

            <main className="flex-grow overflow-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <Tabs tabs={tabs}/>
                    {duplicates.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Duplicate Files Found</h2>
                            <DuplicateTable duplicates={duplicates}/>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;