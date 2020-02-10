import { basename, resolve } from 'path'
import { ExitMessage } from './domain/model/cli_response'
import { runCli } from './domain/prompt'

// main
(async () => {
    const default_project_name = basename(resolve(process.cwd()))
    const args = process.argv
    try {
        const response: ExitMessage = await runCli(default_project_name, args.slice(2))
        console.log(response)
        process.exit(0)
    } catch (ex) {
        console.log(ex.message)
        process.exit(ex.exit_code || -1)
    }
})()
