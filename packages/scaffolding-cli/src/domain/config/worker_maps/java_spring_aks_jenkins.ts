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
            files: ["build/jenkins/azure/jenkins-pipelines-javaspring-k8s.Jenkinsfile"],
            values: {
                // Variable Replacements
                "company=\"amido\"": `company="${businessObj.company}"`,
                "project=\"stacks\"": `project="${businessObj.project}"`,
                "domain=\"java-jenkins\"": `domain="${businessObj.domain}"`,
                "terraform_state_rg=\"amido-stacks-rg-uks\"": `terraform_state_rg="%REPLACE_ME_WITH_TERRAFORM_STATE_RESOURCE_GROUP%"`,
                "terraform_state_storage=\"amidostackstfstategbl\"": `terraform_state_storage="%REPLACE_ME_WITH_TERRAFORM_STATE_STORAGE_ACCOUNT%"`,
                "terraform_state_container=\"tfstate\"": `terraform_state_container="%REPLACE_ME_WITH_TERRAFORM_STATE_CONTAINER%"`,
                "terraform_state_key=\"stacks-api-java-jenkins\"": `terraform_state_key="${businessObj.project}-jenkins"`,
                "docker_container_registry_name_nonprod=\"amidostacksnonprodeuncore\"": `docker_container_registry_name_nonprod="%REPLACE_ME_WITH_NONPROD_DOCKER_ACR_NAME%"`,
                "docker_container_registry_name_prod=\"amidostacksprodeuncore\"": `docker_container_registry_name_nonprod="%REPLACE_ME_WITH_PROD_DOCKER_ACR_NAME%"`,
                "sonar_project_name=\"stacks-java-jenkins\"": `sonar_project_name="${businessObj.project}-jenkins"`,
                "sonar_project_key=\"stacks-java-jenkins\"": `sonar_project_key="${businessObj.project}-jenkins"`,
                "sonar_organisation=\"amido\"": `sonar_organisation="%REPLACE_ME_WITH_SONAR_ORGANISATION%"`,
                "sonar_remote_repo=\"amido/stacks-java\"": `sonar_remote_repo="%REPLACE_ME_WITH_THE_REMOTE_REPOSITORY_ORGANISATION_AND_NAME%"`,
                "base_domain_nonprod=\"nonprod.amidostacks.com\"": `base_domain_nonprod="nonprod.${networkObj.baseDomain}"`,
                "base_domain_internal_nonprod=\"nonprod.amidostacks.internal\"": `base_domain_internal_nonprod="%REPLACE_ME_WITH_INTERNAL_NONPROD_DOMAIN%"`,
                "base_domain_prod=\"prod.amidostacks.com\"": `base_domain_prod="prod.${networkObj.baseDomain}"`,
                "base_domain_internal_prod=\"prod.amidostacks.internal\"": `base_domain_internal_prod="%REPLACE_ME_WITH_INTERNAL_PROD_DOMAIN%"`,
                // Deploy vars
                "core_resource_group=\"amido-stacks-nonprod-eun-core\"": `core_resource_group="%REPLACE_ME_WITH_NONPROD_CORE_RESOURCE_GROUP%"`,
                "TF_VAR_app_gateway_frontend_ip_name=\"amido-stacks-nonprod-eun-core\"": `TF_VAR_app_gateway_frontend_ip_name="%REPLACE_ME_WITH_NONPROD_APP_GATEWAY_IP_NAME%"`,
                "TF_VAR_app_insights_name=\"amido-stacks-nonprod-eun-core\"": `TF_VAR_app_insights_name="%REPLACE_ME_WITH_NONPROD_APP_INSIGHTS_NAME%"`,
                "resource_def_name=\"stacks-java-api-jenkins\"": `resource_def_name="${businessObj.project}-api-jenkins"`,
                "aks_cluster_name=\"amido-stacks-nonprod-eun-core\"": `aks_cluster_name="%REPLACE_ME_WITH_NONPROD_AKS_CLUSTER_NAME%"`,
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
