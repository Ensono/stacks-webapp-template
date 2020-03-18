import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"

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
            files: ["**/vars.tf"],
            values: {
                "replace_company_name": business_obj?.company || "default",
                "replace_project_name": business_obj?.project || "default",
                "replace_component_name": business_obj?.component || "default",
                "replace_azure_location": cloud_obj?.region || "uksouth"
            }
        }
    ]
}

export const response_message = (project_name: string): string  => {
    return `Your directory has been created, you can now: \n
---- \n
cd ${project_name}/src && gradle build && gradle run \n
---- \n`
}
