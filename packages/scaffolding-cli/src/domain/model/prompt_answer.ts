export interface BusinessSection {
    company: string
    project: string
    domain: string
    component?: string
}

export interface CloudSection {
    region: string
    resource_group?: string
}

export interface SourceControlSection {
    repo_type?: string
    repo_name: string
    repo_url?: string
}

export interface NetworkingSection {
    base_domain: string
}


export interface TerraformSection {
    backend_storage: string
    backend_storage_rg?: string
    backend_storage_container?: string
}
export interface BaseAnswer {
    business_company: string
    project_name: string
    project_type: string
    business_domain: string
    deployment: string
    platform?: string
}

/**
 * extend these with more optional strings
 * these should all be strings and optional
 */
export interface PromptAnswer extends BaseAnswer {
    business_component?: string
    enable_advanced?: boolean
    cloud_region?: string
    cloud_resource_group?: string
    source_control_repo_url?: string
    source_control_repo_name?: string
    source_control_repo_type?: string
    terraform_backend_storage?: string
    terraform_backend_storage_rg?: string
    terraform_backend_storage_container?: string
    networking_base_domain?: string
}

export interface CliAnswerModel extends BaseAnswer {
    business: BusinessSection
    cloud: CloudSection
    terraform: TerraformSection
    source_control: SourceControlSection
    networking: NetworkingSection
    // add more here if needed
}
