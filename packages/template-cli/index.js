'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
const path_1 = require('path')
const prompt_1 = require('./domain/prompt')
// main
;(async () => {
  // initial steps before handing over to a selector worker
  const default_project_name = path_1.basename(path_1.resolve(process.cwd()))
  const args = process.argv
  try {
    const response = await prompt_1.runCli(default_project_name, args.slice(2))
    console.log(response)
    process.exit(0)
  } catch (ex) {
    console.log(ex.message)
    process.exit(ex.exit_code || -1)
  }
})()
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF3QztBQUV4Qyw0Q0FBd0M7QUFFeEMsT0FBTztBQUNQLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDUix5REFBeUQ7SUFDekQsTUFBTSxvQkFBb0IsR0FBRyxlQUFRLENBQUMsY0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDN0QsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUN6QixJQUFJO1FBQ0EsTUFBTSxRQUFRLEdBQWdCLE1BQU0sZUFBTSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDbEI7SUFBQyxPQUFPLEVBQUUsRUFBRTtRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25DO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQSJ9
