import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection, TerraformSection, SourceControlSection, NetworkingSection, JavaSection } from "../../model/prompt_answer"

/**
 * 
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
            files: ["**/api-pipeline.yml"],
            values: {
                "self_repo_tf_src: deploy/azure/app/kube":
                    "self_repo_tf_src: deploy/azure/app",
                "amido-stacks-nonprod-demo": "%REPLACE_ME_FOR_VALID_RESOURCE_NAME%",
                "company: amido": `company: ${businessObj.company}`,
                "project: stacks": `project: ${businessObj.project}`,
                "domain: api": `domain: ${businessObj.domain}`,
                "amido-stacks-demo-infra":
                    "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
                "amido-stacks-demo-api":
                    "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
                "nonprod.amidostacks.com": `${networkObj.baseDomain}`,
            }
        }
    ]
}

export const responseMessage = (projectName: string): string => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${projectName}/src && gradle build && gradle run \n
---- \n`
}
