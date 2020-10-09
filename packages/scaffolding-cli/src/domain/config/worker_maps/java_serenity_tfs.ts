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
        },
        {
            files: ["build/azDevops/azure/azure-pipeline-post-deploy-serenity-frontend.yml"],
            values: {
                "  - name: self_repo\n    value: \"stacks-webapp-template/packages/scaffolding-cli/templates\"": `  - name: self_repo\n    value: "%REPLACE_ME_WITH_YOUR_REPO%"`,
                // Below replacement doesn't work for some reason, and so using the smaller replacemnt below it...
                // "  - name: working_directory\n    value: \"$(Agent.BuildDirectory)/s/$(self_repo)/test/xxAMIDOxx.xxSTACKSxx.E2E.Serenity\"": `  - name: working_directory\n    value: ""`,
                "/test/xxAMIDOxx.xxSTACKSxx.E2E.Serenity": ``,
                "  - name: base_url\n    value: \"https://dev-netcore-app.nonprod.amidostacks.com\"": `  - name: base_url\n    value: "%REPLACE_ME_WITH_WEBAPP_URL%"`,
                "  - name: api_base_url\n    value: \"https://dev-java-api.nonprod.amidostacks.com\"": `  - name: api_base_url\n    value: "%REPLACE_ME_WITH_API_URL%"`,
                "  - name: api_base_path\n    value: \"/api\"": `  - name: api_base_url\n    value: "/api/menu"`,
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
