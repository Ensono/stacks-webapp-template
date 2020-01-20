"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const prompt_1 = require("./lib/prompt");
// let { logger } = require('simple-winston-logger-abstraction').stdout
// import { stdout } from 'simple-winston-logger-abstraction'
// main
(async () => {
    // initial steps before handing over to a selector worker
    const default_project_name = path_1.basename(path_1.resolve(process.cwd()));
    const args = process.argv;
    try {
        const initial_response = await prompt_1.initializeQuestions(default_project_name, args.slice(2));
        console.log(initial_response);
        process.exit(0);
    }
    catch (ex) {
        console.log(ex.message);
        process.exit(ex.exit_code || -1);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF3QztBQUN4Qyx5Q0FBa0Q7QUFFbEQsdUVBQXVFO0FBQ3ZFLDZEQUE2RDtBQUU3RCxPQUFPO0FBQ1AsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNSLHlEQUF5RDtJQUN6RCxNQUFNLG9CQUFvQixHQUFHLGVBQVEsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM3RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3pCLElBQUk7UUFDQSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sNEJBQW1CLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2xCO0lBQUMsT0FBTyxFQUFFLEVBQUU7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQztBQUNMLENBQUMsQ0FBQyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiYXNlbmFtZSwgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBpbml0aWFsaXplUXVlc3Rpb25zIH0gZnJvbSAnLi9saWIvcHJvbXB0J1xuXG4vLyBsZXQgeyBsb2dnZXIgfSA9IHJlcXVpcmUoJ3NpbXBsZS13aW5zdG9uLWxvZ2dlci1hYnN0cmFjdGlvbicpLnN0ZG91dFxuLy8gaW1wb3J0IHsgc3Rkb3V0IH0gZnJvbSAnc2ltcGxlLXdpbnN0b24tbG9nZ2VyLWFic3RyYWN0aW9uJ1xuXG4vLyBtYWluXG4oYXN5bmMgKCkgPT4ge1xuICAgIC8vIGluaXRpYWwgc3RlcHMgYmVmb3JlIGhhbmRpbmcgb3ZlciB0byBhIHNlbGVjdG9yIHdvcmtlclxuICAgIGNvbnN0IGRlZmF1bHRfcHJvamVjdF9uYW1lID0gYmFzZW5hbWUocmVzb2x2ZShwcm9jZXNzLmN3ZCgpKSlcbiAgICBjb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaW5pdGlhbF9yZXNwb25zZSA9IGF3YWl0IGluaXRpYWxpemVRdWVzdGlvbnMoZGVmYXVsdF9wcm9qZWN0X25hbWUsIGFyZ3Muc2xpY2UoMikpXG4gICAgICAgIGNvbnNvbGUubG9nKGluaXRpYWxfcmVzcG9uc2UpXG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKVxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV4Lm1lc3NhZ2UpXG4gICAgICAgIHByb2Nlc3MuZXhpdChleC5leGl0X2NvZGUgfHwgLTEpXG4gICAgfVxufSkoKVxuIl19