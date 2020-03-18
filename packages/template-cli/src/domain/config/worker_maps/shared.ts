import { BuildReplaceInput } from "../file_mapper"
import { BusinessSection, CloudSection } from "../../model/prompt_answer"


export const final_response_message = (project_name: string, message: string, config_created: boolean = false): string  => {
    let config_message = `----> \n
Config file has been written out to current directory \n
Please re-run the CLI with the following command. \n
npx @amido-stacks/scaffolding-cli ${project_name}.bootstrap-config.json \n
<----- \n
NB: IF you haven't gone through the advanced setup - plese ensure you have replaced all the relevant values.
    `

    let final = `${message} \n
---->
    You can find quickstart guides and additional info here: https://github.com/amido/stacks-webapp-template/blob/master/packages/template-cli/templates/docs/index.md. \n
<----\n`
    if (config_created) {
        final += config_message
    }
    return final
}
