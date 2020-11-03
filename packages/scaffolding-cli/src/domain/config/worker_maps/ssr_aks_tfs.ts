import { resolve } from "path"
import { BuildReplaceInput } from "../file_mapper"
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
}): Array<BuildReplaceInput> => {
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
                "domain: node": `domain: ${businessObj.domain}`,
                "component: \\$\\(pipeline_variable_component\\)": `component: webapp`,
                "src/ssr": "src",
                "self_generic_name: stacks-api": "self_generic_name: $(project)-$(domain)",
                "nonprod.amidostacks.com": `${networkObj.baseDomain}`,
                "docker_image_name: \\$\\(component\\)": "docker_image_name: $(self_generic_name)",
                "amido-stacks-webapp": "%REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES%",
                "tf_state_key: stacks-webapp": `tf_state_key: "${businessObj.project}-${businessObj.domain}"`,
                "deploy/azure/app/kube": "deploy/azure/app",
                "terraform_state_workspace: dev-\\$\\(component\\)": "terraform_state_workspace: dev",
                "docker_container_registry_name: amidostacksnonprodeuncore": "docker_container_registry_name: %REPLACE_ME_FOR_CONTAINER_REGISTRY%",
                "amido-stacks-nonprod-eun-core": "%REPLACE_ME_FOR_CLOUD_RESOURCE_NAME%",
                "dev-\\$\\(component\\)": "dev-webapp",
                "\\$\\(pipeline_variable_api\\)": "api",
                "region: northeurope": `region: ${cloudObj.region}`,
                "https://dev-api.nonprod.cli-testing.nonprod.amidostacks.com/api/menu": "%REPLACE_ME_FOR_API_URL%"
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `
🎉 Created React SSR in ${resolve(process.cwd(), projectName)} with:
* boostrapped template React SSR
* supporting pipeline
* testing frameworks
`
}
