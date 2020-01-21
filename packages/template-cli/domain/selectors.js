'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
const base_workflow_interface_1 = require('./workers/base_workflow_interface')
// enum FlowSelector {
//     //
// }
class FlowSelector {}
exports.FlowSelector = FlowSelector
FlowSelector.option_ssr_aks_azuredevops = async function(instructions) {
  return await base_workflow_interface_1.ssr_aks_tfs(instructions)
}
FlowSelector.option_csr_aks_azuredevops = async function(instructions) {
  return await base_workflow_interface_1.csr_aks_tfs(instructions)
}
exports.default = FlowSelector
// import { ssr_aks_tfs } from './workers/base'
// export { ssr_aks_tfs }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0VBQTRFO0FBSTVFLHNCQUFzQjtBQUN0QixVQUFVO0FBQ1YsSUFBSTtBQUVKLE1BQWEsWUFBWTs7QUFBekIsb0NBT0M7QUFOVSx1Q0FBMEIsR0FBRyxLQUFLLFdBQVUsWUFBMEI7SUFDekUsT0FBTyxNQUFNLHFDQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUFBO0FBQ00sdUNBQTBCLEdBQUksS0FBSyxXQUFVLFlBQTBCO0lBQzFFLE9BQU8sTUFBTSxxQ0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQzFDLENBQUMsQ0FBQTtBQUdMLGtCQUFlLFlBQVksQ0FBQTtBQUczQiwrQ0FBK0M7QUFFL0MseUJBQXlCIn0=
