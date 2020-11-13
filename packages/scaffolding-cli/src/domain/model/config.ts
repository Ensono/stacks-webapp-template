export interface FolderMap {
    src: string
    dest: string
    excludeFiles?: Array<string>
}

export interface SingleConfigKey {
    gitRepo: string
    gitRef: string
    folderMap: Array<FolderMap>
    localPath: string
    fileNameReplacementPaths?: Array<string>
    searchValue?: string
}

export interface Static {
    [key: string]: SingleConfigKey
}
