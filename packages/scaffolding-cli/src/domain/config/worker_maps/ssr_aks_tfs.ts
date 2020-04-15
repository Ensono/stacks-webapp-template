import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param project_name 
 * @param business_obj 
 * @param cloud_obj 
 */
export const in_files = (project_name: string, business_obj?: BusinessSection, cloud_obj?: CloudSection): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/*.md"],
            values: {
                "PROJECT_NAME": project_name
            }
        },
        {
            files: ["**/package.json"],
            values: {
                "PROJECT_NAME": project_name
            }
        },
        {
            files: ["**/*-pipeline.yml"],
            values: {
                "amido-stacks-webapp": business_obj?.company || "default",
                "stacks-webapp-template/packages/scaffolding-cli/templates": "REPLACE_ME_FOR_REPO_NAME",
                "src/ssr": "src",
                "packages/scaffolding-cli/templates/": "",
                "amido-stacks-nonprod-node": cloud_obj?.resource_group || "REPLACE_ME_FOR_RG_NAME",
                "amidostacksnonprodnode": "REPLACE_ME_FOR_ACR_NAME", // cloud_obj?.acr_name
            }
        },
        // this is unnecessary as the yml place the values in the tf at runtime
        {
            files: ["**/vars.tf"],
            values: {
                "replace_project_name": business_obj?.project || "default",
                "replace_component_name": business_obj?.component || "default",
                "replace_azure_location": cloud_obj?.region || "uksouth",
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
