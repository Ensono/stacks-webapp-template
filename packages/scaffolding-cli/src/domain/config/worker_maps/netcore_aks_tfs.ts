import { startCase, toLower } from 'lodash'
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
                "project_type": ".NET Core REST API with CQRS",
                "project_docs_url": "https://stacks.amido.com/docs/workloads/azure/backend/netcore/introduction_netcore"
            }
        },
        {
            files: ["**/*.cs", "**/*.sln", "**/Dockerfile", "**/*.csproj"],
            values: {
                "xxAMIDOxx": startCase(toLower(businessObj.company)).replace(/\s/gm, "") || "Company",
                "xxSTACKSxx": startCase(toLower(businessObj.project)).replace(/\s/gm, "") || "Project",
            }
        },
        {
            files: ["**/azure-pipelines-netcore-k8s.yml"],
            values: {
                // Variable Replacements
                "company: amido": `company: ${businessObj.company}`,
                "project: stacks": `project: ${businessObj.project}`,
                "domain: netcore-api": `domain: ${businessObj.domain}`,
                "self_repo: stacks-dotnet": `self_repo: "${scmObj.repoName}"`,
                "self_generic_name: stacks-api": "self_generic_name: $(project)-$(domain)",
                "tf_state_rg: \"amido-stacks-rg-uks\"": `tf_state_rg: "%REPLACE_ME_WITH_TERRAFORM_STATE_RESOURCE_GROUP%"`,
                "tf_state_storage: \"amidostackstfstategbl\"": `tf_state_storage: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_ACCOUNT%"`,
                "tf_state_container: \"tfstate\"": `tf_state_container: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_CONTAINER%"`,
                "tf_state_key: \"netcore-api\"": `tf_state_key: "${businessObj.project}-${businessObj.domain}"`,
                "docker_container_registry_name_nonprod: amidostacksnonprodeuncore": `docker_container_registry_name_nonprod: "%REPLACE_ME_WITH_NONPROD_DOCKER_ACR_NAME%"`,
                "docker_container_registry_name_prod: amidostacksprodeuncore": `docker_container_registry_name_prod: "%REPLACE_ME_WITH_PROD_DOCKER_ACR_NAME%"`,
                "region: \"northeurope\"": `region: "${cloudObj.region}"`,
                "base_domain_nonprod: nonprod.amidostacks.com": `base_domain_nonprod: "nonprod.${networkObj.baseDomain}"`,
                "base_domain_internal_nonprod: nonprod.amidostacks.internal": `base_domain_internal_nonprod: "%REPLACE_ME_WITH_INTERNAL_NONPROD_DOMAIN%"`,
                "base_domain_prod: prod.amidostacks.com": `base_domain_prod: "prod.${networkObj.baseDomain}"`,
                "base_domain_internal_prod: prod.amidostacks.internal": `base_domain_internal_prod: "%REPLACE_ME_WITH_INTERNAL_PROD_DOMAIN%"`,
                // Library Variable Replacements
                "- group: amido-stacks-infra-credentials-nonprod": `- group: "%REPLACE_ME_WITH_NONPROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                "- group: amido-stacks-webapp": `- group: "%REPLACE_ME_WITH_APP/SONAR_VARIABLES%"`,
                "- group: amido-stacks-infra-credentials-prod": `- group: "%REPLACE_ME_WITH_PROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                // In-Stage variables
                // Dev
                // AppInfraDev
                "TF_VAR_app_insights_name: \"amido-stacks-nonprod-eun-core\"": `TF_VAR_app_insights_name: "%REPLACE_ME_WITH_NONPROD_APP_INSIGHTS_NAME%"`,
                "TF_VAR_app_gateway_frontend_ip_name: \"amido-stacks-nonprod-eun-core\"": `TF_VAR_app_gateway_frontend_ip_name: "%REPLACE_ME_WITH_NONPROD_APP_GATEWAY_IP_NAME%"`,
                "TF_VAR_core_resource_group: \"amido-stacks-nonprod-eun-core\"": `TF_VAR_core_resource_group: "%REPLACE_ME_WITH_NONPROD_CORE_RESOURCE_GROUP%"`,
                // DeployDev
                "kubernetes_clusterrg: \"amido-stacks-nonprod-eun-core\"": `kubernetes_clusterrg: "%REPLACE_ME_WITH_NONPROD_AKS_CLUSTER_RESOURCE_GROUP%"`,
                "kubernetes_clustername: \"amido-stacks-nonprod-eun-core\"": `kubernetes_clustername: "%REPLACE_ME_WITH_NONPROD_AKS_CLUSTER_NAME%"`,
                // Prod
                // AppInfraProd
                "TF_VAR_app_insights_name: \"amido-stacks-prod-eun-core\"": `TF_VAR_app_insights_name: "%REPLACE_ME_WITH_PROD_APP_INSIGHTS_NAME%"`,
                "TF_VAR_app_gateway_frontend_ip_name: \"amido-stacks-prod-eun-core\"": `TF_VAR_app_gateway_frontend_ip_name: "%REPLACE_ME_WITH_PROD_APP_GATEWAY_IP_NAME%"`,
                "TF_VAR_core_resource_group: \"amido-stacks-prod-eun-core\"": `TF_VAR_core_resource_group: "%REPLACE_ME_WITH_PROD_CORE_RESOURCE_GROUP%"`,
                // DeployProd
                "kubernetes_clusterrg: \"amido-stacks-prod-eun-core\"": `kubernetes_clusterrg: "%REPLACE_ME_WITH_PROD_AKS_CLUSTER_RESOURCE_GROUP%"`,
                "kubernetes_clustername: \"amido-stacks-prod-eun-core\"": `kubernetes_clustername: "%REPLACE_ME_WITH_PROD_AKS_CLUSTER_NAME%"`,
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && export ASPNETCORE_ENVIRONMENT=Development && dotnet clean && dotnet restore && dotnet build && dotnet run \n
---- \n`
}
