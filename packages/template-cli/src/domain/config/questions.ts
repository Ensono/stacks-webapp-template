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
            company: cliOrConfigAnswer?.business_company || "%REPLACE_ME%",
            project: cliOrConfigAnswer?.business_project || "%REPLACE_ME%",
            component: cliOrConfigAnswer?.business_component ||  "%REPLACE_ME%",
        },
        cloud: {
            resource_group: cliOrConfigAnswer?.cloud_resource_group || "%REPLACE_ME%",
            region: cliOrConfigAnswer?.cloud_region || "%REPLACE_ME%"
        },
        terraform: { 
            backend_storage: cliOrConfigAnswer?.terraform_backend_storage || "%REPLACE_ME%"
        }
    }
}
/**
 * Additional questions should be placed here as we are extending the program
 */
export function cliQuestions(): Array<PromptQuestion> {
    return [
        {
            "type": "select",
            "name": "project_type",
            "message": "Select Project type",
            "choices": [
                {
                    "title": "React SSR", "description": "Serverside rendered", "value": "ssr"
                },
                {
                    "title": "React CSR", "description": "Clientside rendered", "value": "csr"
                }
            ],
            "initial": 0
        },
        {
            "type": "select",
            "name": "platform",
            "message": "Select Target Platform",
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
            "message": "Select Target Deployment",
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
            "message": "Create a JSON config",
            "initial": true
        },
        {
            "type": "confirm",
            "name": "advanced_config",
            "message": "Enable Advanced Config ",
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
            "type": "text",
            "name": "cloud_resource_group",
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
        }
    ]
}
