import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection } from "../../model/prompt_answer"

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
                "project_name": projectName
            }
        },
        {
            files: ["**/*.java", "**/pom.xml", "**/Dockerfile"],
            values: {
                "com.xxAMIDOxx": `${(businessObj?.company)?.toLowerCase().replace(/\s/gm, "") || "company"}`,
                "xxSTACKSxx": (businessObj?.project)?.toLowerCase().replace(/\s/gm, "") || "project",
            }
        }
    ]
}

export const responseMessage = (projectName: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && gradle build && gradle run \n
---- \n`
}
