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

const optionConfigDescribe =
    "Path to config file that will be used in the scaffolding process"
const optionConfigDescription = "Path to config file"

const optionInteractiveDescribe = "Create project interactively"
const optionInteractiveDescription = "Run interactively"

async function cliCommand(argv: CliOptions) {
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

        if (response.code != 0) {
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

const runOptions = (yargs: any) => {
    yargs
        .scriptName("@amidostacks/scaffolding-cli")
        .options("c", {
            alias: ["c", "conf"],
            type: "string",
            nargs: 1,
            demandOption: false,
            describe: optionConfigDescription,
            description: optionConfigDescription,
        })
        .options("interactive", {
            alias: ["i"],
            type: "boolean",
            demandOption: false,
            describe: optionInteractiveDescribe,
            description: optionInteractiveDescription,
        })
        .options("infra", {
            alias: ["infra-only"],
            type: "boolean",
            demandOption: false,
            describe: "Run CLI only generating infra specific outputs",
            description: "Infra only outputs",
        })
    return yargs
}

let runTestOptions = (yargs: any) => {
    yargs
        .scriptName("@amidostacks/scaffolding-cli")
        .options("c", {
            alias: ["c", "conf"],
            type: "string",
            nargs: 1,
            demandOption: false,
            describe: optionConfigDescribe,
            description: optionConfigDescription,
        })
        .options("i", {
            alias: ["i"],
            type: "boolean",
            demandOption: false,
            describe: optionInteractiveDescribe,
            description: optionInteractiveDescription,
        })
    return yargs
}
// main cli entry
yargs
    .scriptName("@amidostacks/scaffolding-cli")
    .command(
        "run [options]",
        `Create a templated solution project`,
        runOptions,
        cliCommand,
    )
    .command(
        "test [options]",
        "Create a standalone test framework",
        runTestOptions,
        cliCommand,
    )
    .usage(`${introUsageMessage()}\nUsage: npx $0 <command> [options]`)
    .example(
        "$0 run -i",
        "Run Scaffolding CLI with interactive prompts",
    )
    .example(
        "$0 run -c sample.bootstrap.config.json",
        "Run Scaffolding CLI with a options specified in a config file",
    )
    .example("$0 test -i", "Create a standalone test framework interactively")
    .example("$0 run -infra", "Generate infra only output")
    .help()
    .demandCommand()
    .showHelpOnFail(true, "Specify --help for available options")
    .epilog("Amido Stacks - https://github.com/amido/stacks").argv
