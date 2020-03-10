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
}

export interface BaseAnswer { 
    project_name: string,
    project_type: string,
    platform: string,
    deployment: string
}

export interface PromptAnswer extends BaseAnswer {
    business?: BusinessSection
    cloud?: CloudSection
    terraform?: TerraformSection
}

