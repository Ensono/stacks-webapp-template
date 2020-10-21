export interface BusinessSection {
    company: string
    project: string
    domain: string
    component?: string
}

export const PlatformTypeEnum = {
    AKS: 'aks',
    GKE: 'gke',
    EKS: 'eks',
    ANY: 'any'
} as const;

export const DeploymentTypeEnum = {
    TFS: 'azdevops',
    JENKINS: 'jenkins'
} as const;

export const BackendStorageTypeEnum = {
    AWSS3: 'awsS3',
    AZUREBLOB: 'azureBlob',
    GCPGCS: 'gcpGcs'
} as const;

export enum ProjectTypeEnum {
    JAVASPRING = 'javaspring',
    NETCORE = 'netcore',
    SSR = 'ssr',
    CSR = 'csr',
    INFRA = 'infra',
    TESTNETCORESELENIUM = 'testnetcoreselenium',
    TESTJSTESTCAFE = 'testjstestcafe',
    TESTJAVASERENTIY = 'testjavaserenity',
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
    backendStorage: typeof BackendStorageTypeEnum[keyof typeof BackendStorageTypeEnum]
    backendStorageRg?: string
    backendStorageContainer?: string
}

export interface JavaSection {
    namespace: string
    testingFramework: string
}

export interface BaseAnswer {
    businessCompany: string
    projectName: string
    projectType: typeof ProjectTypeEnum[keyof typeof ProjectTypeEnum]
    businessDomain: string
    deployment: typeof DeploymentTypeEnum[keyof typeof DeploymentTypeEnum]
    platform?: typeof PlatformTypeEnum[keyof typeof PlatformTypeEnum]
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
    javaTldNamespace?: string
    javaTestingFramework?: string
}

export interface CliAnswerModel extends BaseAnswer {
    enableAdvanced: boolean
    business: BusinessSection
    cloud: CloudSection
    terraform: TerraformSection
    sourceControl: SourceControlSection
    networking: NetworkingSection
    [ProjectTypeEnum.JAVASPRING]?: JavaSection
}

export interface JavaCliAnswerModel extends CliAnswerModel {
    [ProjectTypeEnum.JAVASPRING]: JavaSection
}
