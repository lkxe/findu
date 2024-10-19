import { useState, FC } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from 'lucide-react';

type DropdownProps = {
    label: string;
    options: string[];
    onSelect: (option: string) => void;
    width?: number;
    className?: string;
    selectedOption: string;
};

const Dropdown: FC<DropdownProps> = ({ label, options, onSelect, width = 40, className = '', selectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: { opacity: 1, y: 0 },
    };

    const handleToggle = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const handleOptionClick = (option: string) => {
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center w-full ${className}`}>
            <span className="mb-2 sm:mb-0 sm:mr-3 text-sm font-medium text-gray-700">{label}</span>
            <div className="relative" style={{ width: `${width}%` }}>
                <button
                    onClick={handleToggle}
                    className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <span className="truncate text-gray-700">{selectedOption}</span>
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-400" />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={dropdownVariants}
                            transition={{ duration: 0.1 }}
                            className="absolute mt-1 w-full z-50 bg-white border border-gray-300 rounded-md shadow-lg"
                        >
                            <ul className="max-h-60 rounded-md py-1 text-sm text-gray-700 overflow-auto focus:outline-none">
                                {options.map(option => (
                                    <li
                                        key={option}
                                        className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                                            option === selectedOption ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dropdown;