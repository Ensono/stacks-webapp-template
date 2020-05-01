import { BuildReplaceInput } from "../file_mapper"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param project_name
 */
export const in_files = (project_name: string): Array<BuildReplaceInput> => {
    return [
        {
            files: ["**/package.json"],
            values: {
                "PROJECT_NAME": project_name
            }
        }
    ]
}

export const response_message = (project_name: string): string  => {
    return `Your Typescript TestCafe Testing Framework has been created. To get started: \n
---- \n
cd ${project_name} && npm install && npm run test \n
---- \n`
}

