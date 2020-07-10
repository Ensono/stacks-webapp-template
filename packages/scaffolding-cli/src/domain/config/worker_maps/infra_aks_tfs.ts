import { BusinessSection, CloudSection, TerraformSection, SourceControlSection, NetworkingSection } from "../../model/prompt_answer"
import { BuildReplaceInput } from "../file_mapper"

export const inFiles = ({
    projectName,
    businessObj,
    cloudObj,
    terraformObj,
    scmObj,
    networkObj }:
    {
        projectName: string; businessObj: BusinessSection;
        cloudObj: CloudSection;
        terraformObj: TerraformSection;
        scmObj: SourceControlSection,
        networkObj: NetworkingSection
    }): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/infra-pipeline.yml"],
            values: {
                "domain: node": `domain: ${businessObj?.domain}`,
                "component: webapp": `domain: ${businessObj?.component}`,
                "self_repo_tf_src: deploy/azure/infra/stacks-aks": "self_repo_tf_src: deploy/azure/infra",
                "terraform_state_workspace: nonprod": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
                "amido-stacks-nonprod-uks-node": "REPLACE_ME_FOR_CLOUD_RESOURCE_NAME",
                "nonprod.amidostacks.com": `${networkObj?.baseDomain}`,
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
