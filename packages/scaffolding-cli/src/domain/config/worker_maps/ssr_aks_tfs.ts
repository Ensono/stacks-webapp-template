import { resolve } from "path"
import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection } from "../../model/prompt_answer"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName 
 * @param businessObj 
 * @param cloudObj 
 */
export const inFiles = ({ projectName, businessObj, cloudObj, terraformObj, scmObj }: { projectName: string; businessObj?: BusinessSection; cloudObj?: CloudSection; terraformObj?: TerraformSection; scmObj?: SourceControlSection }): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/package.json"],
            values: {
                "PROJECT_NAME": projectName
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

export const responseMessage = (projectName: string): string  => {
    return `
🎉 Created React SSR in ${resolve(process.cwd(), projectName)} with:
* boostrapped template React SSR
* supporting pipeline
* testing frameworks
`
}
