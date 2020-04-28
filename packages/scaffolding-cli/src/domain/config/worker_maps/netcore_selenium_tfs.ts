import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"
import { startCase, toLower } from 'lodash'
/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param project_name 
 * @param business_obj 
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
            files: ["**/*.cs", "**/*.sln", "**/*.csproj"],
            values: {
                "xxAMIDOxx": startCase(toLower(business_obj?.company)) || "Company",
                "xxSTACKSxx": startCase(toLower(business_obj?.project)) || "Project",
            }
        }
    ]
}

export const response_message = (project_name: string): string  => {
    return `Your .NET Selenium Testing Framework has been created. To get started: \n
---- \n
cd ${project_name} dotnet restore && dotnet test \n
---- \n`
}

