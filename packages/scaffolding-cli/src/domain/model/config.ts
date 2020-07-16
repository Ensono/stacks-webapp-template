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

export enum ConfigKeyEnum {
    SSR = 'ssr',
    CSR = 'csr',
    SSRGKE = 'ssrGke',
    SSRGKEJENKINS = 'ssrGkeJenkins',
    AKSINFRA = 'aksInfra',
    GKEINFRA = 'gkeInfra',
    GKEINFRAJENKINS = 'gkeInfraJenkins',
    JSTESTCAFE = 'jsTestcafe',
    NETCORE = 'netcore',
    NETCORESELENIUM = 'netcoreSelenium',
    JAVASPRING = 'javaSpring',
    SHARED = 'shared'
}

export type Static = { 
    [key in ConfigKeyEnum]: SingleConfigKey
}
