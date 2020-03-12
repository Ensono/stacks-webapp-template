import { FolderMap, BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"

/**
 * Statically assign the folder mapping from temp to templated out directory
 */
export const to_folders = (): Array<FolderMap> =>  {
    return [
        { src: 'shared', dest: '' },
        { src: 'build/azDevops/azure', dest: 'build/azDevops/azure' },
        { src: 'deploy/azure/ssr', dest: 'deploy/azure' },
        { src: 'deploy/k8s', dest: 'deploy/k8s' },
        { src: 'docs', dest: 'docs' },
        { src: 'src/netcore/samples/aspnetcore/security', dest: 'src' }
    ]
}

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
