export namespace settings {
	
	export class AppSettings {
	    language: string;
	    theme: string;
	    exclusions: string[];
	    scanFileTypes: string[];
	    minimumFileSize: number;
	    ignoreSystemFolders: boolean;
	    comparisonAlgorithm: string;
	    confirmBeforeDeleting: boolean;
	
	    static createFrom(source: any = {}) {
	        return new AppSettings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.language = source["language"];
	        this.theme = source["theme"];
	        this.exclusions = source["exclusions"];
	        this.scanFileTypes = source["scanFileTypes"];
	        this.minimumFileSize = source["minimumFileSize"];
	        this.ignoreSystemFolders = source["ignoreSystemFolders"];
	        this.comparisonAlgorithm = source["comparisonAlgorithm"];
	        this.confirmBeforeDeleting = source["confirmBeforeDeleting"];
	    }
	}

}

