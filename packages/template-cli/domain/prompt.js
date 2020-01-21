'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : {default: mod}
  }
Object.defineProperty(exports, '__esModule', {value: true})
const prompts_1 = require('prompts')
const path_1 = require('path')
const fs_1 = require('fs')
const questions_1 = __importDefault(require('./config/questions'))
const workflow_1 = require('./model/workflow')
// FLOW
// ProjectName
// project Type (SSR/CSR)
// --> express with next
// --> platform target (AKS)
// --> deployment tooling (TFS)
let userSelection = {}
let exitMessage = {}
/**
 *
 * @param default_project_name
 * @returns
 */
async function runCli(default_project_name, cli_args) {
  // v0 of Question Selection
  // let user_selection: PromptAnswer
  if (cli_args.length > 0) {
    userSelection = await _get_from_config(cli_args[0])
  } else {
    userSelection = await _get_from_cli(default_project_name)
  }
  // selections.project_name = userSelection
  return await _select_flow(userSelection)
}
exports.runCli = runCli
/**
 * @private
 * @param default_project_name
 */
async function _get_from_cli(default_project_name) {
  let cliSelection
  // Always assigning the project name question - static forever
  let initialQs = new Array({
    type: 'text',
    name: 'project_name',
    message: 'Select Project Name',
    initial: default_project_name,
  })
  const questions = questions_1.default()
  questions.forEach(el => {
    initialQs = [...initialQs, el]
  })
  cliSelection = await prompts_1.prompt(initialQs)
  return cliSelection
}
/**
 * @private
 * @param config_path
 */
async function _get_from_config(config_path) {
  let configSelection
  if (path_1.isAbsolute(config_path)) {
    configSelection = JSON.parse(fs_1.readFileSync(config_path, 'utf-8').trim())
  } else {
    configSelection = JSON.parse(
      fs_1
        .readFileSync(path_1.resolve(process.cwd(), config_path), 'utf-8')
        .trim(),
    )
  }
  return configSelection
}
async function _select_flow(selection) {
  let determined_choice = `${selection.project_type}_${selection.platform}_${selection.deployment}`
  const workflows = workflow_1.WorkflowOptions()
  try {
    let message = await workflows[determined_choice](selection)
    exitMessage.code = 0
    exitMessage.message = message
  } catch (ex) {
    exitMessage.code = ex.code || -1
    exitMessage.message = ex.message
  }
  return exitMessage
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvbXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLCtCQUEwRDtBQUMxRCwyQkFBMkM7QUFDM0MsbUVBQTZDO0FBSzdDLCtDQUE0RDtBQUU1RCxRQUFRO0FBQ1IsZUFBZTtBQUNmLHlCQUF5QjtBQUN6Qix3QkFBd0I7QUFDeEIsNEJBQTRCO0FBQzVCLCtCQUErQjtBQUUvQixJQUFJLGFBQWEsR0FBK0IsRUFBRSxDQUFBO0FBQ2xELElBQUksV0FBVyxHQUE2QixFQUFFLENBQUE7QUFFOUM7Ozs7R0FJRztBQUNILEtBQUssVUFBVSxNQUFNLENBQUMsb0JBQTRCLEVBQUUsUUFBdUI7SUFDdkUsMkJBQTJCO0lBQzNCLG1DQUFtQztJQUNuQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLGFBQWEsR0FBRyxNQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3REO1NBQU07UUFDSCxhQUFhLEdBQUcsTUFBTSxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtLQUM1RDtJQUNELDBDQUEwQztJQUUxQyxPQUFPLE1BQU0sWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRTVDLENBQUM7QUE0RFEsd0JBQU07QUExRGY7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLGFBQWEsQ0FBQyxvQkFBNEI7SUFDdEQsSUFBSSxZQUEwQixDQUFBO0lBRTdCLDhEQUE4RDtJQUM5RCxJQUFJLFNBQVMsR0FBMEIsSUFBSSxLQUFLLENBQWlCO1FBQzdELElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLGNBQWM7UUFDcEIsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixPQUFPLEVBQUUsb0JBQW9CO0tBQ2hDLENBQUMsQ0FBQTtJQUVGLE1BQU0sU0FBUyxHQUEwQixtQkFBWSxFQUFFLENBQUE7SUFDdkQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNuQixTQUFTLEdBQUcsQ0FBQyxHQUFHLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVILFlBQVksR0FBRyxNQUFNLGdCQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDdEMsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUVEOzs7R0FHRztBQUNILEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxXQUFtQjtJQUNoRCxJQUFJLGVBQTZCLENBQUE7SUFFaEMsSUFBSSxpQkFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFDO1FBQ3hCLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7S0FDMUU7U0FBTTtRQUNILGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFZLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0tBQ2xHO0lBRUQsT0FBTyxlQUFlLENBQUM7QUFFM0IsQ0FBQztBQUVELEtBQUssVUFBVSxZQUFZLENBQUMsU0FBdUI7SUFDL0MsSUFBSSxpQkFBaUIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUE7SUFFakcsTUFBTSxTQUFTLEdBQWEsMEJBQWUsRUFBRSxDQUFBO0lBRTdDLElBQUk7UUFDQSxJQUFJLE9BQU8sR0FBRyxNQUFNLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzNELFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ3BCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0tBRWhDO0lBQUMsT0FBTyxFQUFFLEVBQUU7UUFDVCxXQUFXLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDaEMsV0FBVyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFBO0tBQ25DO0lBQ0QsT0FBTyxXQUFXLENBQUE7QUFDdEIsQ0FBQyJ9
