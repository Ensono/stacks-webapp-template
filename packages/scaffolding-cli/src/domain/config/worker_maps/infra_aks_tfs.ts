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
            files: ["**/*.md"],
            values: {
                "project_type": "Cloud platform shared services",
                "project_docs_url": "https://amido.github.io/stacks/docs/infrastructure/azure/core_infrastructure"
            }
        },
        {
            files: ["**/infra-pipeline.yml"],
            values: {
                "domain: core": `domain: ${businessObj?.domain}`,
                "self_repo_tf_src: deploy/azure/infra/stacks-aks": "self_repo_tf_src: deploy/azure/infra",
                "region: northeurope": `region: ${cloudObj.region}`,
                "tf_state_key: core-sharedservices": "tf_state_key: $(project)-$(domain)",
                "amidostacks.com": `${networkObj?.baseDomain}`,
                "TF_VAR_acme_email: \"stacks@amido.com\"": "TF_VAR_acme_email: \"%REPLACE_ME_FOR_ACME_EMAIL_ADDRESS%\""
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
