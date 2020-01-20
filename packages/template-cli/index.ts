import { basename, resolve } from 'path'
import { initializeQuestions } from './lib/prompt'

// let { logger } = require('simple-winston-logger-abstraction').stdout
// import { stdout } from 'simple-winston-logger-abstraction'

// main
(async () => {
    // initial steps before handing over to a selector worker
    const default_project_name = basename(resolve(process.cwd()))
    const args = process.argv
    try {
        const initial_response = await initializeQuestions(default_project_name, args.slice(2))
        console.log(initial_response)
        process.exit(0)
    } catch (ex) {
        console.log(ex.message)
        process.exit(ex.exit_code || -1)
    }
})()
