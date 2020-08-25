import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection, NetworkingSection, JavaSection } from "../../model/prompt_answer"

/**
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName
 * @param businessObj
 * @param cloudObj
 */
export const inFiles = ({
    projectName, businessObj, cloudObj, terraformObj, scmObj, networkObj, javaspringObj
}: {
    projectName: string;
    businessObj: BusinessSection;
    cloudObj: CloudSection;
    terraformObj: TerraformSection;
    scmObj: SourceControlSection,
    networkObj: NetworkingSection,
    javaspringObj: JavaSection
}): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/*.md"],
            values: {
                "project_name": projectName
            }
        },
        {
            files: ["**/*.java", "**/pom.xml", "**/Dockerfile"],
            values: {
                "com.xxAMIDOxx": `${javaspringObj.namespace}.${(businessObj.company)?.toLowerCase().replace(/\s/gm, "") || "company"}`,
                "xxSTACKSxx": (businessObj.project)?.toLowerCase().replace(/[\s-]/gm, "") || "project",
            }
        },
        {
            files: ["build/azDevops/azure/azure-pipelines-javaspring-k8s.yml"],
            values: {
                // Variable Replacements
                "company: amido": `company: "${businessObj.company}"`,
                "project: stacks": `project: "${businessObj.project}"`,
                "domain: java-api": `domain: "${businessObj.domain}"`,
                "self_repo: stacks-java": `self_repo: "${scmObj.repoName}"`,
                "self_remote_repo: \"amido/$(self_repo)\"": `self_remote_repo: "%REMOTE_GITHUB_REPO%/$(self_repo)"`,
                "tf_state_rg: \"amido-stacks-rg-uks\"": `tf_state_rg: "%REPLACE_ME_WITH_TERRAFORM_STATE_RESOURCE_GROUP%"`,
                "tf_state_storage: \"amidostackstfstategbl\"": `tf_state_storage: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_ACCOUNT%"`,
                "tf_state_container: \"tfstate\"": `tf_state_container: "%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_CONTAINER%"`,
                "tf_state_key: \"stacks-api-java\"": `tf_state_key: "${businessObj.project}"`,
                "docker_container_registry_name_nonprod: amidostacksnonprodeuncore": `docker_container_registry_name_nonprod: "%REPLACE_ME_WITH_NONPROD_DOCKER_ACR_NAME%"`,
                "docker_container_registry_name_prod: amidostacksprodeuncore": `docker_container_registry_name_prod: "%REPLACE_ME_WITH_PROD_DOCKER_ACR_NAME%"`,
                "base_domain_nonprod: nonprod.amidostacks.com": `base_domain_nonprod: "${networkObj.baseDomain}"`,
                "base_domain_internal_nonprod: nonprod.amidostacks.internal": `base_domain_internal_nonprod: "%REPLACE_ME_WITH_INTERNAL_NONPROD_DOMAIN%"`,
                "base_domain_prod: prod.amidostacks.com": `base_domain_prod: "${networkObj.baseDomain}"`,
                "base_domain_internal_prod: prod.amidostacks.internal": `base_domain_internal_prod: "%REPLACE_ME_WITH_INTERNAL_PROD_DOMAIN%"`,
                // Library Variable Replacements
                "- group: amido-stacks-infra-credentials-nonprod": `- group: "%REPLACE_ME_FOR_NONPROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                "- group: amido-stacks-java-api": `- group: "%REPLACE_ME_FOR_APP/SONAR_VARIABLES%"`,
                "- group: amido-stacks-infra-credentials-prod": `- group: "%REPLACE_ME_FOR_PROD_INFRA_SPECIFIC_LIBRARY_VARIABLES%"`,
                // In-Stage variables
                // Dev
                "- name: core_resource_group\n        value: \"amido-stacks-nonprod-eun-core\"": `- name: core_resource_group\n        value: "%REPLACE_ME_WITH_NONPROD_CORE_RESOURCE_GROUP%"`,
                // AppInfraDev
                "- name: app_gateway_frontend_ip_name\n            value: \"amido-stacks-nonprod-eun-core\"": `- name: app_gateway_frontend_ip_name\n            value: "%REPLACE_ME_WITH_NONPROD_APP_GATEWAY_IP_NAME%"`,
                "- name: app_insights_name\n            value: \"amido-stacks-nonprod-eun-core\"": `- name: app_insights_name\n            value: "%REPLACE_ME_WITH_NONPROD_APP_INSIGHTS_NAME%"`,
                // DeployDev
                "- name: aks_cluster_name\n            value: \"amido-stacks-nonprod-eun-core\"": `- name: aks_cluster_name\n            value: "%REPLACE_ME_WITH_NONPROD_AKS_CLUSTER_NAME%"`,
                // Prod
                "- name: core_resource_group\n        value: \"amido-stacks-prod-eun-core\"": `- name: core_resource_group\n        value: "%REPLACE_ME_WITH_PROD_CORE_RESOURCE_GROUP%"`,
                // AppInfraProd
                "- name: app_gateway_frontend_ip_name\n            value: \"amido-stacks-prod-eun-core\"": `- name: app_gateway_frontend_ip_name\n            value: "%REPLACE_ME_WITH_PROD_APP_GATEWAY_IP_NAME%"`,
                "- name: app_insights_name\n            value: \"amido-stacks-prod-eun-core\"": `- name: app_insights_name\n            value: "%REPLACE_ME_WITH_PROD_APP_INSIGHTS_NAME%"`,
                // DeployProd
                "- name: aks_cluster_name\n            value: \"amido-stacks-prod-eun-core\"": `- name: aks_cluster_name\n            value: "%REPLACE_ME_WITH_PROD_AKS_CLUSTER_NAME%"`,
                // DeployDev / DeployProd
                "- name: resource_def_name\n            value: \"stacks-java-api\"": `- name: resource_def_name\n            value: "${businessObj.project}-api"`,

            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/java && ./mvnw compile && ./mvnw spring-boot:run \n
---- \n`
}
