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
                "project_docs_url": "https://stacks.amido.com/docs/infrastructure/azure/core_infrastructure"
            }
        },
        {
            files: ["**/azure-pipeline-infrastructure-aks.yml"],
            values: {
                // Variable Replacements
                "company: amido": `company: "${businessObj.company}"`,
                "project: stacks": `project: "${businessObj.project}"`,
                "domain: core": `domain: "${businessObj.domain}"`,
                "self_repo: stacks-infrastructure-aks": `self_repo: "${scmObj.repoName}"`,
                "tf_state_rg: \"amido-stacks-rg-uks\"": `tf_state_rg: "%REPLACE_ME_WITH_TERRAFORM_STATE_RESOURCE_GROUP%"`,
                "tf_state_storage: \"amidostackstfstategbl\"": `tf_state_storage: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_ACCOUNT%"`,
                "tf_state_container: \"tfstate\"": `tf_state_container: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_CONTAINER%"`,
                "tf_state_key: \"core-shared-services\"": `tf_state_key: "${businessObj.project}-${businessObj.domain}"`,
                "region: \"northeurope\"": `region: "${cloudObj.region}"`,
                "base_domain_nonprod: nonprod.amidostacks.com": `base_domain_nonprod: "nonprod.${networkObj.baseDomain}"`,
                "base_domain_internal_nonprod: nonprod.amidostacks.internal": `base_domain_internal_nonprod: "%REPLACE_ME_WITH_INTERNAL_NONPROD_DOMAIN%"`,
                "base_domain_prod: prod.amidostacks.com": `base_domain_prod: "prod.${networkObj.baseDomain}"`,
                "base_domain_internal_prod: prod.amidostacks.internal": `base_domain_internal_prod: "%REPLACE_ME_WITH_INTERNAL_PROD_DOMAIN%"`,
                // Library Variable Replacements
                "- group: amido-stacks-infra-credentials-nonprod": `- group: "%REPLACE_ME_WITH_NONPROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                "- group: amido-stacks-infra-credentials-prod": `- group: "%REPLACE_ME_WITH_PROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                // InfraNonProd / InfraProd
                "TF_VAR_acme_email: \"stacks@amido.com\"": `TF_VAR_acme_email: "webmaster@${networkObj.baseDomain}"`,
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
