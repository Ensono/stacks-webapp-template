import terminalLink from 'terminal-link'

export const final_response_message = (project_name: string, message: string, config_created: boolean = false): string  => {
    let config_message = `----> \n
Config file has been written out to current directory \n
Please re-run the CLI with the following command. \n
npx @amidostacks/scaffolding-cli ${project_name}.bootstrap-config.json \n
<----- \n
NB: IF you haven't gone through the advanced setup - plese ensure you have replaced all the relevant values.
    `

    let final = `${message} \n
---->
Please open the entire templated out directory in your IDE, and poke around to understand the layout. \n
    e.g.: \`code ${project_name}\` \n
You can find quickstart guides and additional info ${terminalLink("here", "https://github.com/amido/stacks-webapp-template/blob/master/packages/scaffolding-cli/templates/docs/index.md")}. \n
If you'd like to contribute please read the ${terminalLink("following", "https://github.com/amido/stacks-webapp-template/blob/master/docs/cli-process.md")} \n
<----\n`
    if (config_created) {
        return config_message + final
    }
    return final
}

export const final_error_message = (message: string, code?: string | number ): string  => {
    let final = `----> \n
Ooooops - Something went wrong \n
error: ${message} \n 
${code ? "code: " + code : ""} \n
<----- \n

Please raise a ${terminalLink("bug/issue", "https://github.com/amido/stacks-webapp-template/issues")} if you think it's an issue with the CLI \n

Amido Stacks
`
    return final
}
