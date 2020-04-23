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
            files: ["**/*.md", "**/package.json", "**/*.properties"],
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

export const final_response_message = (project_name: string, message: string, config_created: boolean = false): string  => {
    let config_message = `----> \n
Config file has been written out to current directory \n
Please re-run the CLI with the following command. \n
npx @amidostacks/scaffolding-cli ${project_name}.bootstrap-config.json \n
<----- \n
NB: IF you haven't gone through the advanced setup - plese ensure you have replaced all the relevant values.
    `

    let final = `${message} \n
---->
Please open the entire templated out directory in your IDE, and poke around to understand the layout. \n
    e.g.: \`code ${project_name}\` \n
You can find quickstart guides and additional info ${terminalLink("here", "https://github.com/amido/stacks-webapp-template/blob/master/packages/scaffolding-cli/templates/docs/index.md")}. \n
If you'd like to contribute please read the ${terminalLink("following", "https://github.com/amido/stacks-webapp-template/blob/master/docs/cli-process.md")} \n
<----\n`
    if (config_created) {
        return config_message + final
    }
    return final
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
