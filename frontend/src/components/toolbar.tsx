import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

type ToolbarProps = {
    onPreferencesClick: () => void;
};

export default function Toolbar({ onPreferencesClick }: ToolbarProps) {
    const [extended, setExtended] = useState(false);

    const handlePreferencesClick = () => {
        setExtended(false);
        onPreferencesClick();
    };

    return (
        <div className="relative">
            <div className="flex justify-end">
                <button
                    className="w-12 h-12 flex justify-center items-center text-white hover:text-blue"
                    onClick={() => setExtended(!extended)}
                >
                    <RxHamburgerMenu className="text-xl" />
                </button>
            </div>
            {extended && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-secbackground rounded-md shadow-lg z-10">
                    <a
                        href="#"
                        className="block px-4 py-2 text-primarytext hover:bg-gray-900"
                        onClick={handlePreferencesClick}
                    >
                        Preferences
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-primarytext hover:bg-gray-100"
                    >
                        Help
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-primarytext hover:bg-gray-100"
                    >
                        About
                    </a>
                </div>
            )}
        </div>
    );
}
