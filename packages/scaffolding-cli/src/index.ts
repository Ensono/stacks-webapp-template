#!/usr/bin/env node
import yargs from 'yargs'
import { basename, resolve } from 'path'
import { ExitMessage, CliOptions } from './domain/model/cli_response'
import { runCli, runConfig } from './domain/prompt'
import chalk from 'chalk'
import { final_error_message } from './domain/config/worker_maps/shared'


async function cliCommand(argv: CliOptions) {
    try {
        const default_project_name = basename(resolve(process.cwd()));
        let response: ExitMessage = <ExitMessage>{}

        if (argv.configfile) {
            // run with a config file
            response = await runConfig(argv)
        } else if (argv.interactive) {
            // run cli flow
            response = await runCli(default_project_name, argv)
        } else {
            console.log(chalk.cyan(yargs.showHelp())) //"Please select an appropriate option"
            return process.exit(0)
        }

        if (response.code != 0) {
            console.log(chalk.red(final_error_message(response.message, response.code)))
            return process.exit(0)
        }

        console.log(chalk.cyan(response.message))
        return process.exit(0)
    } catch (ex) {
        let exCaught = ex as ExitMessage
        console.log(chalk.red(final_error_message(exCaught.message, exCaught.code)))
        return process.exit(ex.code || -1)
    }
}

// main cli entry
yargs
    .scriptName('@amidostacks/scaffolding-cli')
    .command(
        'run [options]',
        'Run CLI with options',
        {},
        cliCommand
    )
    .options({
        configfile: {
            alias: ['c', 'conf'],
            type: 'string',
            nargs: 1,
            demandOption: false,
            describe: "Path to config file that will be used in the scaffolding process",
            description: 'Path to config file'
        },
        interactive: {
            alias: ['i'],
            type: 'boolean',
            demandOption: false,
            describe: "Run CLI through interactive prompts",
            description: 'Run through the CLI interactively'
        },
        infra: {
            alias: ['infra', 'infra-only'],
            type: 'boolean',
            demandOption: false,
            describe: "Run CLI only generating infra specific outpute",
            description: 'Infra only outputs'
        }
    })
    .usage('Usage: npx @amidostacks/scaffolding-cli <command> [options]')
    .example('scaffolding-cli run -i', 'Run Scaffolding CLI with interactive prompts')
    .example('scaffolding-cli run -c sample.bootstrap.config.json', 'Run Scaffolding CLI with a options specified in a config file')
    .example('scaffolding-cli run -infra', 'Generate infra only output')
    .showHelpOnFail(true)
    .demandCommand()
    .epilog("Amido Stacks - https://github.com/amido/stacks")
    .help()
    .argv;
