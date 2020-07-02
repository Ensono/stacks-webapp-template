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
            files: ["**/App.test.tsx"],
            values: {
                "project_name": projectName
            }
        },
        {
            files: ["**/*.yml"],
            values: {
                "src/csr": "src",
                "self_generic_name: stacks-webapp": `self_generic_name: ${businessObj?.project}-${businessObj?.domain}`,
                "amido-stacks-webapp-csr": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
                "tf_state_key: stacks-webapp-csr": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
                "deploy/azure/app/csr": "deploy/azure/app",
                "terraform_state_workspace: dev": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%"
            }
        }
    ]
}

export const responseMessage = (projectName: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && npm install && npm run start \n
---- \n`
}
