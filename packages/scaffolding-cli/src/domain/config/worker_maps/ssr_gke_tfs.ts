import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection } from "../../model/prompt_answer"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param project_name 
 * @param business_obj 
 * @param cloud_obj 
 */
export const in_files = ({ project_name, business_obj, cloud_obj, terraform_obj, scm_obj }: { project_name: string; business_obj?: BusinessSection; cloud_obj?: CloudSection; terraform_obj?: TerraformSection; scm_obj?: SourceControlSection }): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/package.json"],
            values: {
                "project_name": project_name
            }
        },
        {
            files: ["**/*-pipeline.yml"],
            values: {
                "src/ssr": "src",
                "amido-stacks-webapp": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
                "tf_state_key: stacks-webapp": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
                "deploy/azure/app/kube": "deploy/azure/app",
                "terraform_state_workspace: dev": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%"
            }
        }
    ]
}

export const response_message = (project_name: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${project_name}/src && npm install && npm run build && npm run start \n
---- \n`
}
