#!/usr/bin/env node
import { basename, resolve } from 'path'
import { ExitMessage } from './domain/model/cli_response'
import { runCli } from './domain/prompt'
import chalk from 'chalk'

// main
(async () => {
    // let chalk = new chalk
    const default_project_name = basename(resolve(process.cwd()))
    const args = process.argv
    try {
        const response: ExitMessage = await runCli(default_project_name, args.slice(2))
        console.log(chalk.cyan(response.message))
        return process.exit(0)
    } catch (ex) {
        console.log(ex.message)
        return process.exit(ex.code || -1)
    }
})()
