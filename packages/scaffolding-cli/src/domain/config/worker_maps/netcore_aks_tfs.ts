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
                "project_docs_url": "https://amido.github.io/stacks/docs/workloads/azure/backend/netcore/introduction_netcore"
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
            files: ["**/api-pipeline.yml"],
            values: {
                "company: amido": `company: ${businessObj.company}`,
                "project: stacks": `project: ${businessObj.project}`,
                "domain: netcore-api": `domain: ${businessObj.domain}`,
                "self_repo: stacks-dotnet": `self_repo: "${scmObj.repoName}"`,
                "self_repo_tf_src: deploy/azure/app/kube":
                    "self_repo_tf_src: deploy/azure/app",
                "self_generic_name: stacks-api": "self_generic_name: $(project)-$(domain)",                
                "northeurope": cloudObj.region,
                "amidostacksnonprodeuncore": "%REPLACE_ME_FOR_CONTAINER_REGISTRY_NAME%",
                "TF_VAR_app_insights_name: \"amido-stacks-nonprod-eun-core\"": "TF_VAR_app_insights_name: %REPLACE_ME_FOR_APP_INSIGHTS_NAME%",
                "TF_VAR_app_gateway_frontend_ip_name: \"amido-stacks-nonprod-eun-core\"": "TF_VAR_app_gateway_frontend_ip_name: %REPLACE_ME_FOR_APP_GATEWAY_IP_NAME%",
                "kubernetes_clustername: amido-stacks-nonprod-eun-core": "kubernetes_clustername: %REPLACE_ME_FOR_AKS_CLUSTER_NAME%",
                "amido-stacks-nonprod-eun-core": "%REPLACE_ME_FOR_CORE_RESOURCE_GROUP%",
                "TF_VAR_dns_record: dev-netcore-api": "TF_VAR_dns_record: dev-$(domain)",
                "namespace: dev-netcore-api": "namespace: dev-$(domain)",
                "app_name: yumido-netcore-api": "app_name: $(domain)",
                "resource_def_name: yumido-netcore-api": "resource_def_name: $(project)-$(domain)",
                "dns_pointer: dev-netcore-api": "dns_pointer: dev-$(domain)",
                "tf_state_key: netcore-api": `tf_state_key: "${businessObj.project}-${businessObj.domain}"`,
                "amido-stacks-demo-infra":
                    "%REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES%",
                "amido-stacks-webapp":
                    "%REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES%",
                "nonprod.amidostacks.com": `${networkObj.baseDomain}`,
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

