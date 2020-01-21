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
    }
    ]
}

export default cliQuestions
