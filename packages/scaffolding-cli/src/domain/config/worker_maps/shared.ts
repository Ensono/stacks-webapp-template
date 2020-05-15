import terminalLink from 'terminal-link'
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection } from '../../model/prompt_answer'
import { BuildReplaceInput } from '../file_mapper'

/**
 * TODO: implement a shared in_files replace to minimize duplication
 * @param project_name 
 * @param business_obj 
 * @param cloud_obj 
 */
export const in_files = ({ project_name, business_obj, cloud_obj, terraform_obj, scm_obj }: { project_name: string; business_obj?: BusinessSection; cloud_obj?: CloudSection; terraform_obj?: TerraformSection; scm_obj?: SourceControlSection }): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/*.md", "**/*.properties"],
            values: {
                "project_name": project_name
            }
        },
        {
            files: ["**/*-pipeline.yml"],
            values: {
                "stacks-webapp-template/packages/scaffolding-cli/templates": scm_obj?.repo_name || "REPLACE_ME_FOR_REPO_NAME",
                "packages/scaffolding-cli/templates/": "",
                "self_repo_tf_src: deploy/azure/infra/stacks-aks": "self_repo_tf_src: deploy/azure/infra",
                // "amido-stacks-nonprod-node": "REPLACE_ME_FOR_RG_NAME",
                // "amidostacksnonprodnode": "REPLACE_ME_FOR_ACR_NAME", // cloud_obj?.acr_name
                "company: amido": `company: ${business_obj?.company}`,
                "project: stacks": `project: ${business_obj?.project}`,
                "domain: node": `domain: ${business_obj?.domain}`,
                "component: node": `domain: ${business_obj?.component}`,
                "nonprod.amidostacks.com": "REPLACE_ME_FOR_DOMAIN",
                "nonprod.amidostacks.internal": "REPLACE_ME_FOR_INTERNAL_DOMAIN",
                "amido-stacks-infra-credentials-nonprod": "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
                "tf_state_storage: amidostackstfstategbl": `tf_state_storage: ${terraform_obj?.backend_storage}`,
                "tf_state_rg: amido-stacks-rg-uks": `tf_state_rg: ${terraform_obj?.backend_storage_rg}`,
                "tf_state_container: tfstate": `tf_state_container: ${terraform_obj?.backend_storage_container}`,
                "tf_state_key: sharedservices": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_SHARED_SERVICES%`,
                "terraform_state_workspace: nonprod": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
            }
        }
    ]
}

export const intro_usage_message = (): string => {
    return `Bootstrap a templated project webapp, API and/or testing framework with supporting pipelines and infrastructure by answering just a few questions.\n
For more information on the scaffolding-cli flow, please see <url>.\n

███████ ████████  █████   ██████ ██   ██ ███████ 
██         ██    ██   ██ ██      ██  ██  ██      
███████    ██    ███████ ██      █████   ███████ 
     ██    ██    ██   ██ ██      ██  ██       ██ 
███████    ██    ██   ██  ██████ ██   ██ ███████ 
`
}

export const final_response_message = (project_name: string, message: string): string  => {
    return `${message} \n
👟 Next steps: check out your bootstapped project in your chosen development environment
        cd <dir>

🤓 To get started: open <dir>/README.md

📖 For guides and supporting information see: <url>

💻 Thank you for using the Amido Stacks scaffolding-cli!
         To contribute: https://github.com/amido/stacks"
`
}

export const final_error_message = (message: string, code?: string | number ): string  => {
    let final = `----> \n
Ooooops - Something went wrong \n
error: ${message} \n 
${code ? "code: " + code : ""} \n
<----- \n

Please raise a ${terminalLink("bug/issue", "https://github.com/amido/stacks-webapp-template/issues")} if you think it's an issue with the CLI \n

Amido Stacks
`
    return final
}
