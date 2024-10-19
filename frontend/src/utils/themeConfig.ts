type ThemeColor = {
    light: string;
    dark: string;
};

const themeConfig: Record<string, ThemeColor> = {
    background: {
        light: 'bg-gray-100',
        dark: 'bg-gray-900',
    },
    text: {
        light: 'text-gray-900',
        dark: 'text-white',
    },
    sidebar: {
        light: 'bg-white',
        dark: 'bg-gray-800',
    },
    sidebarHover: {
        light: 'hover:bg-gray-100',
        dark: 'hover:bg-gray-700',
    },
    sidebarActive: {
        light: 'bg-blue-50 text-blue-600',
        dark: 'bg-blue-900 text-blue-200',
    },
    // TODO
};

export default themeConfig;