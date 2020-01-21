import { basename, resolve } from 'path'
import { ExitMessage } from './domain/model/cliResponse'
import { runCli } from './domain/prompt'

// main
(async () => {
    // initial steps before handing over to a selector worker
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
