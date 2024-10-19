
export interface SettingsProps {
    title?: string;  // Make this optional as it's not always needed
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void | Promise<void>;
}

export interface AppSettings {
    //General
    language: string;
    theme: string;
    defaultFolder: string;
    autoStartScan: boolean;
    showTooltips: boolean;
    enableAutomaticUpdates: boolean;

    //Advanced
    fileExtensions: string[];
    minFileSize: number;
    maxFileSize: number;
    includeHidden: boolean;
    scanByContent: boolean;
    includeSystemFolders: boolean;
    scanCompressed: boolean;
    scanDepth: number;
    ignorePatterns: string[];

    //Comparison
    comparisonMethod: string;
    considerDate: boolean;
    compareMetadata: boolean;
    ignoreExtensions: boolean;
    fuzzyTolerance: number;
    similarityThreshold: number;

    //Action
    defaultAction: string;
    confirmBeforeAction: boolean;
    createActionLog: boolean;
    preserveFolderStructure: boolean;
    moveToFolder: string;
    enableFileProtection: boolean;

    //Performance
    scanThreads: number;
    bufferSize: number;
    cpuUsageLimit: number;
    useMemoryMappedFiles: boolean;
    diskIOPriority: string;
    cacheScanResults: boolean;
}

export const getDefaultSettings = (): AppSettings => ({
    language: 'English',
    theme: 'Light',
    defaultFolder: '',
    autoStartScan: false,
    showTooltips: true,
    enableAutomaticUpdates: true,
    fileExtensions: ['*'],
    minFileSize: 0,
    maxFileSize: Number.MAX_SAFE_INTEGER,
    includeHidden: false,
    scanByContent: false,
    includeSystemFolders: false,
    scanCompressed: false,
    scanDepth: -1, // no limit
    ignorePatterns: [],
    comparisonMethod: 'MD5',
    considerDate: false,
    compareMetadata: false,
    ignoreExtensions: false,
    fuzzyTolerance: 0,
    similarityThreshold: 100,
    defaultAction: 'Delete',
    confirmBeforeAction: true,
    createActionLog: true,
    preserveFolderStructure: false,
    moveToFolder: '',
    enableFileProtection: false,
    scanThreads: 4,
    bufferSize: 4096,
    cpuUsageLimit: 100,
    useMemoryMappedFiles: false,
    diskIOPriority: 'Background',
    cacheScanResults: true,
});

export interface SettingsProps {
    title?: string;
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void | Promise<void>;
}

export interface SettingsPageProps {
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void | Promise<void>;
}

export interface SettingsPageProps {
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void | Promise<void>;
}