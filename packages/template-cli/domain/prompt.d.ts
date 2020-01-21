import { ExitMessage } from './model/cliResponse';
/**
 *
 * @param default_project_name
 * @returns
 */
declare function runCli(default_project_name: string, cli_args: Array<string>): Promise<ExitMessage>;
export { runCli };
