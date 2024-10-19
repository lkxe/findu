// src/components/PathTable.tsx
import React from 'react';
import { XIcon } from 'lucide-react';

interface PathTableProps {
    value: string[];
    onChange: (newPaths: string[]) => void;
}

const PathTable: React.FC<PathTableProps> = ({ value, onChange }) => {
    const handlePathChange = (index: number, newPath: string) => {
        const newPaths = [...value];
        newPaths[index] = newPath;
        onChange(newPaths);
    };

    const handleRemovePath = (index: number) => {
        const newPaths = value.filter((_, i) => i !== index);
        onChange(newPaths);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Path</th>
                    <th className="px-4 py-2 w-16"></th>
                </tr>
                </thead>
                <tbody>
                {value.map((path, index) => (
                    <tr key={index} className="border-b">
                        <td className="px-4 py-2">
                            <input
                                type="text"
                                value={path}
                                onChange={(e) => handlePathChange(index, e.target.value)}
                                className="w-full px-2 py-1 border rounded"
                            />
                        </td>
                        <td className="px-4 py-2">
                            <button
                                onClick={() => handleRemovePath(index)}
                                className="p-1 text-red-500 hover:bg-red-100 rounded"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PathTable;