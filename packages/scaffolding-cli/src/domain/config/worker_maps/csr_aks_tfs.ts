import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName 
 * @param businessObj 
 * @param cloudObj 
 */
export const inFiles = (projectName: string, businessObj?: BusinessSection, cloudObj?: CloudSection): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/*.md"],
            values: {
                "project_name": projectName
            }
        },
        {
            files: ["**/package.json"],
            values: {
                "project_name": projectName
            }
        },
        {
            files: ["**/*.yml"],
            values: {
                "amido-stacks-webapp": businessObj?.company || "default",
                "replace_project_name": businessObj?.project || "default",
                "replace_component_name": businessObj?.component || "default",
                "replace_azure_location": cloudObj?.region || "uksouth",
                "stacks-webapp-template/packages/scaffolding-cli/templates/src/ssr": "git_object?/src"
            }
        }
    ]
}

export const responseMessage = (projectName: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && npm install && npm run stuff \n
---- \n`
}
