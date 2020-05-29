#!/usr/bin/env node
import chalk from "chalk"
import yargs from "yargs"
import {basename, resolve} from "path"
import {ExitMessage, CliOptions} from "./domain/model/cli_response"
import {runCli, runConfig} from "./domain/prompt"
import {
    finalErrorMessage,
    introUsageMessage,
} from "./domain/config/worker_maps/shared"
import * as content from "./content"

async function cliCommand(argv: CliOptions): Promise<ExitMessage>{
    try {
        const defaultProjectName = basename(resolve(process.cwd()))
        let response: ExitMessage = {} as ExitMessage

        if (argv.configfile) {
            // run with a config file
            response = await runConfig(argv)
        } else if (argv.interactive) {
            // run cli flow
            response = await runCli(defaultProjectName)
        } else {
            console.log(chalk.cyan(yargs.showHelp())) // "Please select an appropriate option"
            return process.exit(0)
        }

        if (response.code !== 0) {
            console.log(
                chalk.red(finalErrorMessage(response.message, response.code)),
            )
            return process.exit(0)
        }

        console.log(chalk.cyan(response.message))
        return process.exit(0)
    } catch (ex) {
        const exCaught = ex as ExitMessage
        console.log(
            chalk.red(finalErrorMessage(exCaught.message, exCaught.code)),
        )
        return process.exit(ex.code || -1)
    }
}

async function cliTestCommand(argv: CliOptions): Promise<ExitMessage>{
    try {
        const defaultProjectName = basename(resolve(process.cwd()))
        let response: ExitMessage = {} as ExitMessage

        if (argv.configfile) {
            // run with a config file
            response = await runConfig(argv)
        } else if (argv.interactive) {
            // run cli flow
            response = await runCli(defaultProjectName)
        } else {
            console.log(chalk.cyan(yargs.showHelp())) // "Please select an appropriate option"
            return process.exit(0)
        }

        if (response.code !== 0) {
            console.log(
                chalk.red(finalErrorMessage(response.message, response.code)),
            )
            return process.exit(0)
        }

        console.log(chalk.cyan(response.message))
        return process.exit(0)
    } catch (ex) {
        const exCaught = ex as ExitMessage
        console.log(
            chalk.red(finalErrorMessage(exCaught.message, exCaught.code)),
        )
        return process.exit(ex.code || -1)
    }
}

const runOptions = () => {
    yargs
        .scriptName("@amidostacks/scaffolding-cli")
        .options("c", {
            alias: ["c", "conf"],
            type: "string",
            nargs: 1,
            demandOption: false,
            describe: content.options.config.describe,
            description: content.options.config.description,
        })
        .options("interactive", {
            alias: ["i"],
            type: "boolean",
            demandOption: false,
            describe: content.options.interactive.describe,
            description: content.options.interactive.description,
        })
        .options("infra", {
            alias: ["infra-only", "infra"],
            type: "boolean",
            demandOption: false,
            describe: content.options.infra.describe,
            description: content.options.infra.description,
        })
    return yargs
}

const runTestOptions = () => {
    yargs
        .scriptName("@amidostacks/scaffolding-cli")
        .options("c", {
            alias: ["c", "conf"],
            type: "string",
            nargs: 1,
            demandOption: false,
            describe: content.options.config.describe,
            description: content.options.config.description,
        })
        .options("i", {
            alias: ["i"],
            type: "boolean",
            demandOption: false,
            describe: content.options.config.describe,
            description: content.options.config.description,
        })
    return yargs
}
// main cli entry
// eslint-disable-next-line no-unused-expressions
yargs
    .scriptName("@amidostacks/scaffolding-cli")
    .command(
        content.main.command.run.command,
        content.main.command.run.description,
        runOptions,
        cliCommand,
    )
    .command(
        content.main.command.test.command,
        content.main.command.test.description,
        runTestOptions,
        cliCommand,
    )
    .usage(`${introUsageMessage()}\nUsage: npx $0 <command> [options]`)
    .example(
        "$0 run -i",
        content.options.interactive.description,
    )
    .example(
        "$0 run -c sample.bootstrap-config.json",
        content.options.config.description,
    )
    .example("$0 test -i", content.options.interactive.description)
    .example("$0 run -infra", content.options.infra.description)
    .help()
    .demandCommand()
    .showHelpOnFail(true, "Specify --help for available options")
    .epilog("Amido Stacks - https://github.com/amido/stacks").argv
