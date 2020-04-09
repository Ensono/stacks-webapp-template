export interface FolderMap {
    src: string
    dest: string
}

export interface SingleConfigKey {
    git_repo: string
    git_ref: string
    folder_map: Array<FolderMap>
    local_path: string
}

export interface Static {
    [key: string]: SingleConfigKey
}
