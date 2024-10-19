import React, {ChangeEvent, useState} from 'react';
import { Button } from './ui/button';
import { XIcon } from 'lucide-react';
import {Input} from "./ui/input";

interface FileExtensionListProps {
    extensions: string[];
    onUpdate: (extensions: string[]) => void;
}

const FileExtensionList: React.FC<FileExtensionListProps> = ({ extensions, onUpdate }) => {
    const [newExtension, setNewExtension] = useState('');

    const addExtension = () => {
        if (newExtension && !extensions.includes(newExtension)) {
            onUpdate([...extensions, newExtension]);
            setNewExtension('');
        }
    };

    const removeExtension = (extension: string) => {
        onUpdate(extensions.filter(ext => ext !== extension));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">File Extensions</h3>
            <div className="flex space-x-2">
                <Input
                    value={newExtension}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewExtension(e.target.value)}
                    placeholder="Enter file extension (e.g., .jpg)"
                    className="flex-grow"
                />
                <Button onClick={addExtension}>Add</Button>
            </div>
            <div className="space-y-2">
                {extensions.map((extension, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span>{extension}</span>
                        <button
                            onClick={() => removeExtension(extension)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <XIcon size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileExtensionList;