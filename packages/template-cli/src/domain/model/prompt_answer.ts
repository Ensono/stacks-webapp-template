export interface BusinessSection {
    company: string
    project: string
    component: string
}

export interface CloudSection {
    region: string
    resource_group: string
}

export interface TerraformSection {
    backend_storage?: string
    // todo: more here
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
    cloud_region?: string
    cloud_resource_group?: string
    terraform_backend_storage?: string
}

export interface CliAnswerModel extends BaseAnswer {
    business: BusinessSection
    cloud: CloudSection
    terraform: TerraformSection
    // add more here if needed
}
