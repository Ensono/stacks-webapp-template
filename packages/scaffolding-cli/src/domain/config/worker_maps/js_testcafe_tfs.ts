import { BuildReplaceInput as jsTestcafe } from "../file_mapper"

/**
 * 
 * Statically assign the file mapping from temp and the Key/Value mapp of strings to replace in file
 * @param projectName
 */
export const inFiles = (projectName: string): Array<jsTestcafe> => {
    return [
        {
            files: ["**/package.json"],
            values: {
                "project_name": projectName
            }
        }
    ]
}

export const responseMessage = (projectName: string): string  => {
    return `Your Typescript TestCafe Testing Framework has been created. To get started: \n
---- \n
cd ${projectName} && npm install && npm run test \n
---- \n`
}

