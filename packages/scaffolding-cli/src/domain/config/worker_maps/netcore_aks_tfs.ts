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
                "PROJECT_NAME": projectName
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
                "self_repo_tf_src: deploy/azure/app/kube":
                    "self_repo_tf_src: deploy/azure/app",
                "amidostacksnonprodeuncore": "%REPLACE_ME_FOR_CONTAINER_REGISTRY_NAME",
                "amido-stacks-nonprod-eun-core": "%REPLACE_ME_FOR_VALID_RESOURCE_NAME%",
                "yumido-netcore-api": "REPLACE_ME_FOR_YOUR_VALUE",
                "company: amido": `company: ${businessObj.company}`,
                "project: stacks": `project: ${businessObj.project}`,
                "domain: api": `domain: ${businessObj.domain}`,
                "tf_state_key: netcore-api": "tf_state_key: %REPLACE_ME_FOR_TF_STATE_KEY%",
                "amido-stacks-demo-infra":
                    "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
                "amido-stacks-webapp":
                    "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
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

