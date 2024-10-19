import React, {ChangeEvent, useState} from 'react';
import { Button } from './ui/button';
import { XIcon, CheckIcon, XCircleIcon } from 'lucide-react';
import {Input} from "./ui/input";

interface IgnorePatternListProps {
    patterns: string[];
    onUpdate: (patterns: string[]) => void;
}

const IgnorePatternList: React.FC<IgnorePatternListProps> = ({ patterns, onUpdate }) => {
    const [newPattern, setNewPattern] = useState('');
    const [testString, setTestString] = useState('');
    const [testResult, setTestResult] = useState<boolean | null>(null);

    const addPattern = () => {
        if (newPattern && !patterns.includes(newPattern)) {
            onUpdate([...patterns, newPattern]);
            setNewPattern('');
        }
    };

    const removePattern = (pattern: string) => {
        onUpdate(patterns.filter(p => p !== pattern));
    };

    const testPattern = () => {
        try {
            const regex = new RegExp(newPattern);
            setTestResult(regex.test(testString));
        } catch (error) {
            setTestResult(null);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Ignore Patterns</h3>
            <div className="space-y-2">
                <Input
                    value={newPattern}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPattern(e.target.value)}
                    placeholder="Enter ignore pattern (regex supported)"
                    className="w-full"
                />
                <div className="flex space-x-2">
                    <Input
                        value={testString}
                        onChange={(e: ChangeEvent<HTMLInputElement> ) => setTestString(e.target.value)}
                        placeholder="Test string"
                        className="flex-grow"
                    />
                    <Button onClick={testPattern}>Test</Button>
                </div>
                {testResult !== null && (
                    <div className={`flex items-center ${testResult ? 'text-green-500' : 'text-red-500'}`}>
                        {testResult ? <CheckIcon size={20} /> : <XCircleIcon size={20} />}
                        <span className="ml-2">
              {testResult ? 'Pattern matches test string' : 'Pattern does not match test string'}
            </span>
                    </div>
                )}
                <Button onClick={addPattern} className="w-full">Add Pattern</Button>
            </div>
            <div className="space-y-2">
                {patterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span>{pattern}</span>
                        <button
                            onClick={() => removePattern(pattern)}
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

export default IgnorePatternList;