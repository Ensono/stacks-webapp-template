'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
const fs_extra_1 = require('fs-extra')
const path_1 = require('path')
const TEMPLATES_DIRECTORY = `../../templates/`
const ssr_aks_azdevops = {}
function copyFilter(src, dest) {
  // return true
  if (
    src.indexOf('node_modules') > -1 ||
    src.indexOf('.next') > -1 ||
    src.indexOf('coverage') > -1 ||
    src.indexOf('dist') > -1
  ) {
    return false
  } else {
    return true
  }
}
async function ssr_aks_tfs(instructions) {
  try {
    /**
     * Creates a directory if not present
     */
    await fs_extra_1.copy(
      path_1.resolve(__dirname, TEMPLATES_DIRECTORY),
      path_1.resolve(process.cwd(), instructions.project_name),
      {filter: copyFilter},
    )
    return instructions
  } catch (ex) {
    return ex
  }
}
exports.ssr_aks_tfs = ssr_aks_tfs
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyX2Frc190ZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzc3JfYWtzX3Rmcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUV0QywrQkFBOEI7QUFFOUIsTUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQTtBQUM5QyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQTtBQUUzQixTQUFTLFVBQVUsQ0FBQyxHQUFXLEVBQUUsSUFBWTtJQUN6QyxjQUFjO0lBQ2QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQzFCLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7U0FBTTtRQUNILE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDO0FBRUQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxZQUEwQjtJQUNqRCxJQUFJO1FBQ0E7O1dBRUc7UUFDSCxNQUFNLGVBQUksQ0FBQyxjQUFPLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLEVBQUUsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFFLEVBQUUsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQTtRQUM3SCxPQUFPLFlBQVksQ0FBQTtLQUN0QjtJQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUE7S0FDWjtBQUNMLENBQUM7QUFFUSxrQ0FBVyJ9
