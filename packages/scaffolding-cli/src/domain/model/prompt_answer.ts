export interface BusinessSection {
    company: string
    project: string
    domain: string
    component: string
}

export interface CloudSection {
    region: string
    resource_group: string
}

export interface SourceControlSection {
    repo_type: string
    repo_name: string
    repo_url: string
}

export interface GitSection {
    url: string
    repo_name: string
}

export interface TerraformSection {
    backend_storage: string
    backend_storage_rg: string
    backend_storage_container?: string
}

export interface BaseAnswer { 
    project_name: string,
    project_type: string,
    platform: string,
    deployment: string,
    advanced_config: boolean,
    create_config: boolean
}

/**
 * extend these with more optional strings
 * these should all be strings and optional
 */
export interface PromptAnswer extends BaseAnswer {
    business_company?: string
    business_project: string
    business_component?: string
    business_domain?: string
    cloud_region?: string
    cloud_resource_group?: string
    source_control_repo_url?: string
    source_control_repo_name?: string
    source_control_repo_type?: string
    terraform_backend_storage?: string
    terraform_backend_storage_rg?: string
    terraform_backend_storage_container?: string
}

export interface CliAnswerModel extends BaseAnswer {
    business: BusinessSection
    cloud: CloudSection
    terraform: TerraformSection
    source_control: SourceControlSection
    // add more here if needed
}
