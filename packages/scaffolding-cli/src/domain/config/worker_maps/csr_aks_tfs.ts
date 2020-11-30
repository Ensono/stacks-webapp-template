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
            files: ["**/*.md"],
            values: {
                "project_type": "Client side rendered web application",
                "project_docs_url": "https://stacks.amido.com/docs/workloads/azure/frontend/CSR/getting_started_csr"
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
            files: ["**/azure-pipeline-csr-azure.yml"],
            values: {
                // Variable Replacements
                "company: amido": `company: "${businessObj.company}"`,
                "project: stacks": `project: "${businessObj.project}"`,
                "domain: csr": `domain: "${businessObj.domain}"`,
                "self_repo: stacks-typescript-csr": `self_repo: "${scmObj.repoName}"`,
                "tf_state_rg: \"amido-stacks-rg-uks\"": `tf_state_rg: "%REPLACE_ME_WITH_TERRAFORM_STATE_RESOURCE_GROUP%"`,
                "tf_state_storage: \"amidostackstfstategbl\"": `tf_state_storage: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_ACCOUNT%"`,
                "tf_state_container: \"tfstate\"": `tf_state_container: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_CONTAINER%"`,
                "tf_state_key: \"stacks-webapp-csr\"": `tf_state_key: "${businessObj.project}-${businessObj.domain}"`,
                "TF_VAR_resource_group_location: northeurope": `TF_VAR_resource_group_location: ${cloudObj.region}`,
                "base_domain_nonprod: nonprod.amidostacks.com": `base_domain_nonprod: "nonprod.${networkObj.baseDomain}"`,
                "base_domain_prod: prod.amidostacks.com": `base_domain_prod: "prod.${networkObj.baseDomain}"`,
                // Library Variable Replacements
                "- group: amido-stacks-infra-credentials-nonprod": `- group: "%REPLACE_ME_WITH_NONPROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                "- group: amido-stacks-webapp-csr": `- group: "%REPLACE_ME_WITH_APP/SONAR_VARIABLES%"`,
                "- group: amido-stacks-infra-credentials-prod": `- group: "%REPLACE_ME_WITH_PROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                // In-Stage Variables
                // Dev
                // AppInfraDev
                "TF_VAR_app_insights_name: \"amido-stacks-nonprod-eun-core\"": `TF_VAR_app_insights_name: "%REPLACE_ME_WITH_NONPROD_APP_INSIGHTS_NAME%"`,
                "TF_VAR_dns_resource_group: \"amido-stacks-nonprod-eun-core\"": `TF_VAR_dns_resource_group: "%REPLACE_ME_WITH_NONPROD_CORE_RESOURCE_GROUP%"`,
                // Prod
                // AppInfraProd
                "TF_VAR_app_insights_name: \"amido-stacks-prod-eun-core\"": `TF_VAR_app_insights_name: "%REPLACE_ME_WITH_PROD_APP_INSIGHTS_NAME%"`,
                "TF_VAR_dns_resource_group: \"amido-stacks-prod-eun-core\"": `TF_VAR_dns_resource_group: "%REPLACE_ME_WITH_PROD_CORE_RESOURCE_GROUP%"`
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && npm install && npm run start \n
---- \n`
}
