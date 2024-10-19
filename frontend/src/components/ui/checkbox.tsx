import { useState } from 'react';

type CheckboxProps = {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
};

const Checkbox = ({ label, checked = false, onChange }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label className="flex items-center">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="hidden"
            />
            <div
                className={`w-6 h-6 rounded border-2 border-gray-400 ${
                    isChecked ? 'bg-blue-500 border-blue-500' : ''
                } flex items-center justify-center`}
            >
                {isChecked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
            <span className="ml-2">{label}</span>
        </label>
    );
};

export default Checkbox;
