import { startCase, toLower } from 'lodash'
import { BuildReplaceInput as netcoreSelenium } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"
/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName 
 * @param businessObj 
 */
export const inFiles = (projectName: string,
    businessObj: BusinessSection,
    cloudObj?: CloudSection): Array<netcoreSelenium> => {
    return [
        {
            files: ["**/*.md"],
            values: {
                "PROJECT_NAME": projectName
            }
        },
        {
            files: ["**/*.cs", "**/*.sln", "**/*.csproj"],
            values: {
                "xxAMIDOxx": startCase(toLower(businessObj.company)) || "Company",
                "xxSTACKSxx": startCase(toLower(businessObj.project)) || "Project",
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your .NET Selenium Testing Framework has been created. To get started: \n
---- \n
cd ${projectName} dotnet restore && dotnet test \n
---- \n`
}

