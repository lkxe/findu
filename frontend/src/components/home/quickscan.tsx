// src/components/QuickScan.tsx
import React, { useState } from 'react';
import { RiScan2Line, RiFolderOpenLine, RiSettings4Line, RiQuestionLine } from "react-icons/ri";
import DuplicateTable from "../DuplicateTable";

interface Duplicate {
    id: string;
    name: string;
    size: number;
    type: string;
    preview: string;
    occurrences: string[];
}

export default function QuickScan() {
    const [duplicates, setDuplicates] = useState<Duplicate[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [showTutorial, setShowTutorial] = useState(true);

    const handleSelectFolder = () => {
        // Implement folder selection logic
        const folder = "/path/to/selected/folder"; // This would be the actual selected folder
        setSelectedFolder(folder);
    };

    const handleQuickScan = () => {
        if (!selectedFolder) {
            alert("Please select a folder first.");
            return;
        }
        setIsScanning(true);
        // Implement quick scan logic
        setTimeout(() => {
            setDuplicates([
                {
                    id: '1',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '2',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '3',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '4',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '5',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '6',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '7',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '8',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },{
                    id: '9',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '10',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },
                {
                    id: '11',
                    name: 'example.jpg',
                    size: 1024000,
                    type: 'image/jpeg',
                    preview: 'path/to/preview.jpg',
                    occurrences: ['/path/to/file1.jpg', '/path/to/file2.jpg'],
                },

                // Add more mock data as needed
            ]);
            setIsScanning(false);
        }, 2000);
    };

    const handleAdvancedScan = () => {
        // Implement advanced scan logic
        console.log("Advanced scan");
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 p-6">
            {showTutorial && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <RiQuestionLine className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Welcome to findu! To get started, select a folder to scan, then click "Quick Scan" to find duplicates.
                            </p>
                            <button
                                className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                                onClick={() => setShowTutorial(false)}
                            >
                                Got it, don't show this again
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Duplicate File Finder</h1>
                <p className="text-gray-600">Find and manage duplicate files on your computer</p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
                <button
                    onClick={handleSelectFolder}
                    className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    <RiFolderOpenLine className="text-xl text-blue-500 mr-2" />
                    <span className="text-gray-700">Select Folder</span>
                </button>
                {selectedFolder && (
                    <span className="text-sm text-gray-600">
            Selected: {selectedFolder}
          </span>
                )}
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleQuickScan}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition-colors duration-300"
                    disabled={!selectedFolder || isScanning}
                >
                    <RiScan2Line className="text-xl mr-2" />
                    <span>Quick Scan</span>
                </button>
                <button
                    onClick={handleAdvancedScan}
                    className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-300"
                >
                    <RiSettings4Line className="text-xl mr-2" />
                    <span>Advanced Scan</span>
                </button>
            </div>

            <div className="flex-grow overflow-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Scan Results</h2>
                {isScanning ? (
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600">Scanning...</span>
                    </div>
                ) : duplicates.length > 0 ? (
                    <DuplicateTable duplicates={duplicates} />
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        No duplicates found yet. Select a folder and start a scan to find duplicate files.
                    </div>
                )}
            </div>
        </div>
    );
}