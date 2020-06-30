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
export const inFiles = ({ projectName, businessObj, cloudObj, terraformObj, scmObj, networkObj }: { projectName: string; businessObj?: BusinessSection; cloudObj?: CloudSection; terraformObj?: TerraformSection; scmObj?: SourceControlSection, networkObj?: NetworkingSection }): Array<BuildReplaceInput> => {
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
                "xxAMIDOxx": startCase(toLower(businessObj?.company)).replace(/\s/gm, "") || "Company",
                "xxSTACKSxx": startCase(toLower(businessObj?.project)).replace(/\s/gm, "") || "Project",
            }
        },
        {
            files: ["**/api-pipeline.yml"],
            values: {
                "self_repo_tf_src: deploy/azure/app/kube":
                    "self_repo_tf_src: deploy/azure/app",
                "amido-stacks-nonprod-demo": "%REPLACE_ME_FOR_VALID_RESOURCE_NAME%",
                "company: amido": `company: ${businessObj?.company}`,
                "project: stacks": `project: ${businessObj?.project}`,
                "domain: api": `domain: ${businessObj?.domain}`,
                "amido-stacks-demo-infra":
                    "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
                "amido-stacks-demo-api":
                    "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
                "tf_state_storage: amidostackstfstategbl": `tf_state_storage: %REPLACE_ME_FOR_BLOB_STORAGE_ACCOUNT%`,
                "tf_state_rg: amido-stacks-rg-uks": `tf_state_rg: ${terraformObj?.backendStorageRg}`,
                "tf_state_container: tfstate": `tf_state_container: ${terraformObj?.backendStorageContainer}`,
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

