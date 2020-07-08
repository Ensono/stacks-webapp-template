export interface FolderMap {
    src: string
    dest: string
}

export interface SingleConfigKey {
    gitRepo: string
    gitRef: string
    folderMap: Array<FolderMap>
    localPath: string
    searchValue?: string
}

export interface Static {
    [key: string]: SingleConfigKey
}
