export interface BusinessSection {
    company: string
    project: string
    domain: string
    component?: string
}

export interface CloudSection {
    region: string
    resourceGroup?: string
}

export interface SourceControlSection {
    repoType?: string
    repoName: string
    repoUrl?: string
}

export interface NetworkingSection {
    baseDomain: string
}


export interface TerraformSection {
    backendStorage: string
    backendStorageRg?: string
    backendStorageContainer?: string
}
export interface BaseAnswer {
    businessCompany: string
    projectName: string
    projectType: string
    businessDomain: string
    deployment: string
    platform?: string
}

/**
 * extend these with more optional strings
 * these should all be strings and optional
 */
export interface PromptAnswer extends BaseAnswer {
    enableAdvanced?: boolean
    businessComponent?: string
    cloudRegion?: string
    cloudResourceGroup?: string
    sourceControlRepoUrl?: string
    sourceControlRepoName?: string
    sourceControlRepoType?: string
    terraformBackendStorage?: string
    terraformBackendStorageRg?: string
    terraformBackendStorageContainer?: string
    networkingBaseDomain?: string
}

export interface CliAnswerModel extends BaseAnswer {
    enableAdvanced: boolean
    business: BusinessSection
    cloud: CloudSection
    terraform: TerraformSection
    sourceControl: SourceControlSection
    networking: NetworkingSection
    // add more here if needed
}
