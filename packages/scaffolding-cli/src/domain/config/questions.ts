import { PromptQuestion } from '../model/prompt_question'
import { PromptAnswer, CliAnswerModel } from '../model/prompt_answer'


export function computedSelection(cliOrConfigAnswer: PromptAnswer): CliAnswerModel {
    return <CliAnswerModel> {
        project_name: cliOrConfigAnswer.project_name,
        project_type: cliOrConfigAnswer.project_type,
        platform: cliOrConfigAnswer.platform,
        deployment: cliOrConfigAnswer.deployment,
        advanced_config: cliOrConfigAnswer.advanced_config,
        create_config: cliOrConfigAnswer.create_config,
        business: {
            company: cliOrConfigAnswer?.business_company || "COMPANY_REPLACE_ME",
            project: cliOrConfigAnswer?.business_project || "PROJECT_REPLACE_ME",
            component: cliOrConfigAnswer?.business_component ||  "COMPONENT_REPLACE_ME",
        },
        cloud: {
            resource_group: cliOrConfigAnswer?.cloud_resource_group || "RG_REPLACE_ME",
            region: cliOrConfigAnswer?.cloud_region || "REGION_REPLACE_ME"
        },
        terraform: { 
            backend_storage: cliOrConfigAnswer?.terraform_backend_storage || "BACKEND_STORAGE_REPLACE_ME"
        }
    }
}
/**
 * Additional questions should be placed here as we are extending the program
 */
export function cliQuestions(default_project_name: string): Array<PromptQuestion> {
    return [
        {
            "type": "text",
            "name": "project_name",
            "message": "Create project name (NB: Conform to language conventions - e.g. PascalCase for C# or snake_case for NodeJS)",
            "initial": default_project_name
        },
        {
            "type": "select",
            "name": "project_type",
            "message": "Select project type",
            "choices": [
                {
                    "title": "React SSR", "description": "Serverside rendered", "value": "ssr"
                },
                {
                    "title": "React CSR", "description": "Clientside rendered", "value": "csr"
                },
                {
                    "title": ".netcore", "description": ".Net Core API", "value": "netcore"
                },
                {
                    "title": "Java Springboot", "description": "Java SpringBoot API", "value": "java_spring"
                }
            ],
            "initial": 0
        },
        {
            "type": "select",
            "name": "platform",
            "message": "Select target platform",
            "choices": [
                {
                    "title": "AKS", "description": "Azure Kubernetes", "value": "aks"
                }
            ],
            "initial": 0
        },
        {
            "type": "select",
            "name": "deployment",
            "message": "Select target deployment",
            "choices": [
                {
                    "title": "AzureDevOps", "description": "Azure Devops/VSTS/TFS", "value": "azdevops"
                }
            ],
            "initial": 0
        },
        {
            // "type": (prev: boolean) => prev ? "confirm" : "",
            "type": "confirm",
            "name": "create_config",
            "message": "Create a JSON config (with all selected values for future runs of the CLI)?",
            "initial": true
        },
        {
            "type": "confirm",
            "name": "advanced_config",
            "message": "Continue to Advanced Config (specifying cloud/Terraform/business details)?",
            "initial": true
        }
    ]
}

export function cliAdvancedQuestions(): Array<PromptQuestion> {
    return [
        {
            "type": "autocomplete",
            "name": "cloud_region",
            "message": "Select Cloud region",
            "choices": [
                {
                    "title": "UK South", "value": "uksouth"
                },
                {
                    "title": "US South", "value": "ussouth"
                },
                {
                    "title": "US East", "value": "useast"
                },
                {
                    "title": "US West", "value": "uswest"
                },
            ],
            "initial": 0
        },
        {
            "type": "confirm",
            "name": "cloud_has_infrastructure",
            "message": "Do you have existing Kubernetes infrastructure (AKS/EKS/GKE) that this component will be part of?",
            "initial": true
        },
        {
            "type": (prev: boolean) => prev ? "text" : "",
            "name": "cloud_resource_group",
            "message": "Please provide the resource group/vpc name",
            "initial": "replace-me-rg"
        },
        {
            "type": "text",
            "name": "business_company",
            "message": "Please provide the company name (will use namespacing conventions)",
            "initial": "amido"
        },
        {
            "type": "text",
            "name": "business_project",
            "message": "Please provide the project name (will use namespacing conventions)",
            "initial": "stacks"
        },
        {
            "type": "text",
            "name": "business_component",
            "message": "Please provide the component name (will use namespacing conventions)",
            "initial": "cycle2"
        },
        {
            "type": "text",
            "name": "terraform_backend_storage",
            "message": "Terraform backend state storage (blob name)?",
            "initial": "amidostackstfstategbl"
        }
    ]
}
