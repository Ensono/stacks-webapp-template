#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import { basename, resolve } from 'path'
import { ExitMessage, CliOptions } from './domain/model/cli_response'
import { runCli, runConfig } from './domain/prompt'
import { finalErrorMessage, introUsageMessage } from './domain/config/worker_maps/shared'


async function cliCommand(argv: CliOptions) {
    try {
        const defaultProjectName = basename(resolve(process.cwd()));
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
            console.log(chalk.red(finalErrorMessage(response.message, response.code)))
            return process.exit(0)
        }

        console.log(chalk.cyan(response.message))
        return process.exit(0)
    } catch (ex) {
        const exCaught = ex as ExitMessage
        console.log(chalk.red(finalErrorMessage(exCaught.message, exCaught.code)))
        return process.exit(ex.code || -1)
    }
}

const runOptions = (yargs: any) => {

    yargs
        .option('configfile', {
            alias: ['c', 'conf'],
            type: 'string',
            nargs: 1,
            demandOption: false,
            describe: "Path to config file that will be used in the scaffolding process",
            description: 'Path to config file'
        })
        .option('interactive', {
            alias: ['i'],
            type: 'boolean',
            demandOption: false,
            describe: "Run CLI through interactive prompts",
            description: 'Run through the CLI interactively'
        })
        .option('infra', {
            alias: ['infra-only'],
            type: 'boolean',
            demandOption: false,
            describe: "Run CLI only generating infra specific outputs",
            description: 'Infra only outputs'
        })
    return yargs 
}

let runTestOptions = (yargs: any) => {
    yargs
        .option('configfile', {
            alias: ['c', 'conf'],
            type: 'string',
            nargs: 1,
            demandOption: false,
            describe: "Path to config file that will be used in the scaffolding process",
            description: 'Path to config file'
        })
    return yargs 
}
// main cli entry
yargs
    .scriptName('@amidostacks/scaffolding-cli')
    .command(
        'run [options]',
        // `${intro_usage_message()}\nCreate a templated solution`,
        `Create a templated solution`,
        runOptions,
        cliCommand
    )
    .command(
        'test [options]',
        'Create standalone test framework',
        runTestOptions,
        cliCommand
    )
    .usage(`${introUsageMessage()}\nUsage: npx $0 <command> [options]`)
    .example('scaffolding-cli run -i', 'Run Scaffolding CLI with interactive prompts')
    .example('scaffolding-cli run -c sample.bootstrap.config.json', 'Run Scaffolding CLI with a options specified in a config file')
    .example('scaffolding-cli run -infra', 'Generate infra only output')
    // .help(['help', 'h'], 'To see all available options and commands')
    .help()
    .demandCommand()
    .showHelpOnFail(true, 'Specify --help for available options')
    .epilog("Amido Stacks - https://github.com/amido/stacks")
    .argv;

