import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"
import { startCase, toLower } from 'lodash'
/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param project_name 
 * @param business_obj 
 * @param cloud_obj 
 */
export const in_files = (project_name: string, business_obj?: BusinessSection, cloud_obj?: CloudSection): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/*.md"],
            values: {
                "PROJECT_NAME": project_name
            }
        },
        {
            files: ["**/*.cs", "**/*.sln", "**/Dockerfile", "**/*.csproj"],
            values: {
                "xxAMIDOxx": startCase(toLower(business_obj?.company)) || "Company",
                "xxSTACKSxx": startCase(toLower(business_obj?.project)) || "Project",
            }
        }
    ]
}

export const response_message = (project_name: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${project_name}/src && export ASPNETCORE_ENVIRONMENT=Development && dotnet clean && dotnet restore && dotnet build && dotnet run \n
---- \n`
}

