import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection } from "../../model/prompt_answer"
import { startCase, toLower } from 'lodash'
/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName 
 * @param businessObj 
 * @param cloudObj 
 */
export const inFiles = ({ projectName, businessObj, cloudObj, terraformObj, scmObj }: { projectName: string; businessObj?: BusinessSection; cloudObj?: CloudSection; terraformObj?: TerraformSection; scmObj?: SourceControlSection }): Array<BuildReplaceInput> => {
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
                "xxAMIDOxx": startCase(toLower(businessObj?.company)) || "Company",
                "xxSTACKSxx": startCase(toLower(businessObj?.project)) || "Project",
            }
        }
    ]
}

export const responseMessage = (projectName: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && export ASPNETCORE_ENVIRONMENT=Development && dotnet clean && dotnet restore && dotnet build && dotnet run \n
---- \n`
}

