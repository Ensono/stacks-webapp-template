import { BuildReplaceInput as gkeSsr } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection, NetworkingSection } from "../../model/prompt_answer"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName 
 * @param businessObj 
 * @param cloudObj 
 */
export const inFiles = ({
    projectName,
    businessObj,
    cloudObj,
    terraformObj,
    scmObj,
    networkObj
}: {
    projectName: string;
    businessObj: BusinessSection;
    cloudObj: CloudSection;
    terraformObj: TerraformSection;
    scmObj: SourceControlSection,
    networkObj: NetworkingSection
}): Array<gkeSsr> => {
    return [
        {
            files: ["**/package.json"],
            values: {
                "project_name": projectName
            }
        },
        {
            files: ["**/app-pipeline.yml"],
            values: {
                "src/ssr": "src",
                "amido-stacks-webapp": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
                "tf_state_key: node-app": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
                "deploy/gcp/app/kube": "deploy/gcp/app",
                "terraform_state_workspace: dev": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
                "gke.nonprod.amidostacks.com": `${networkObj.baseDomain}`,
                "gcp_region: europe-west2": "gcp_region: %REPLACE_ME_FOR_REGION%",
                "gcp_project_name: amido-stacks": "gcp_project_name: %REPLACE_ME_FOR_REGION%",
                "gcp_project_id: amido-stacks": "gcp_project_id: %REPLACE_ME_FOR_PROJECT_ID%",
                "gcp_cluster_name: amido-stacks-nonprod-gke-infra": "gcp_cluster_name: %REPLACE_ME_FOR_CLUSTER_NAME%"
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && npm install && npm run build && npm run start \n
---- \n`
}
