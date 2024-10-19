// src/components/ui/Select.tsx
import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
}

interface OptionProps {
    value: string;
    children: React.ReactNode;
}

const Option: React.FC<OptionProps> = ({ children, value }) => (
    <option value={value}>{children}</option>
);

const SelectComponent: React.FC<SelectProps> & {
    Option: typeof Option;
} = ({ id, value, onChange, children }) => {
    return (
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:border-blue-500"
            >
                {children}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </div>
        </div>
    );
};

SelectComponent.Option = Option;

export const Select = SelectComponent;