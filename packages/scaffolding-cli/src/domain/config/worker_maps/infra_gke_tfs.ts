import { BusinessSection, CloudSection, TerraformSection, SourceControlSection, NetworkingSection } from "../../model/prompt_answer"
import { BuildReplaceInput } from "../file_mapper"

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
    terraformObj, scmObj,
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
            files: ["**/infra-pipeline.yml"],
            values: {
                "domain: gke-infra": `domain: ${businessObj.domain}`,
                "component: infra": `domain: ${businessObj?.component}`,
                "tf_state_key: gke-infra": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
                "self_repo_tf_src: deploy/gcp/infra/stacks-gke": "self_repo_tf_src: deploy/gcp/infra",
                "docker_container_registry_name: amidostacksnonproduksnode": "docker_container_registry_name: REPLACE_ME_FOR_CONTAINER_REGISTRY",
                "gke.nonprod.amidostacks.com": `${networkObj.baseDomain}`,
                "gcp_region: europe-west2": "gcp_region: %REPLACE_ME_FOR_REGION%",
                "gcp_project_name: amido-stacks": "gcp_project_name: %REPLACE_ME_FOR_PROJECT%"
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your directory has been created succesfully! \n
The recommended way to test and bootstrap infrastructure locally is to use the docker containers that the pipeline uses. \n
---- \n
cd ${projectName}/deploy/azure/infra \n
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-tf:0.0.4 /bin/bash \n 
$root: terraform init
$root: terraform plan
---- \n
You will want to export all required environment variables inside that container,  and create a local tfvars and backend tfvars files with relevant values for your company/projet, to read more about the local setup visit the amido/stacks github page. \n
Otherwise you can run it straight in the pipeline.`
}
