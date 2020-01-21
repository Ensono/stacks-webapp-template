import { PromptQuestion } from '../model/prompt_question'

/**
 * Additional questions should be placed here as we are extending the program
 */
function cliQuestions(): Array<PromptQuestion> {
    return [{
        "type": "select",
        "name": "project_type",
        "message": "Select JS Project type",
        "choices": [
            {
                "title": "SSR", "description": "Serverside rendered", "value": "ssr"
            },
            {
                "title": "CSR", "description": "Clientside rendered", "value": "csr"
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
                "title": "AKS", "description": "Azure Kuberneter", "value": "aks"
            },
            {
                "title": "EKS", "description": "AWS Kubernetes", "value": "eks"
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
            },
            {
                "title": "Gitlab", "description": "Gitlab", "value": "gitlab"
            }
        ],
        "initial": 0
    }
    ]
}

export default cliQuestions
