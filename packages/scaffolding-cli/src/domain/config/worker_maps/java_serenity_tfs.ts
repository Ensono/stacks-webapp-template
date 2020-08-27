import { startCase, toLower } from 'lodash'
import { BuildReplaceInput as netcoreSelenium } from "../file_mapper"
import { BusinessSection, JavaSection } from "../../model/prompt_answer"

/**
 * Statically assign the file mapping from temp and the Key/Value map of strings to replace in file
 * @param projectName
 * @param businessObj
 */
export const inFiles = ({
    projectName, businessObj, javaspringObj
}: {
    projectName: string
    businessObj: BusinessSection
    javaspringObj: JavaSection
}): Array<netcoreSelenium> => {
    return [
        {
            files: ["**/*.java", "**/pom.xml"],
            values: {
                "com.xxAMIDOxx": `${javaspringObj.namespace}.${(businessObj.company)?.toLowerCase().replace(/\s/gm, "") || "company"}`,
                "xxSTACKSxx": (businessObj.project)?.toLowerCase().replace(/[\s-]/gm, "") || "project",
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your Java Serenity Testing Framework has been created. To get started: \n
---- \n
cd ${projectName}

Be sure to check out the \`README.md\` for more instructions!
---- \n`
}
