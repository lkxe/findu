import themeConfig from './themeConfig';

export function getThemeClass(colorName: string, currentTheme: 'light' | 'dark'): string {
    const themeColor = themeConfig[colorName];
    if (!themeColor) {
        console.warn(`No theme color found for "${colorName}"`);
        return '';
    }
    return themeColor[currentTheme];
}