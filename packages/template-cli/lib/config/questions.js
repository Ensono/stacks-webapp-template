"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Additional questions should be placed here as we are extending the program
 */
function cliQuestions() {
    return [{
            "type": "select",
            "name": "project_type",
            "message": "Select JS Project type",
            "choices": [
                {
                    "title": "SSR", "description": "Serverside rendered", "value": "ssr"
                },
                {
                    "title": "CSR", "description": "Clientside rendered", "value": "csr"
                }
            ],
            "initial": 0
        },
        {
            "type": "select",
            "name": "platform",
            "message": "Select Target Platform",
            "choices": [
                {
                    "title": "AKS", "description": "Azure Kuberneter", "value": "aks"
                },
                {
                    "title": "EKS", "description": "AWS Kubernetes", "value": "eks"
                }
            ],
            "initial": 0
        },
        {
            "type": "select",
            "name": "deployment",
            "message": "Select Target Deployment",
            "choices": [
                {
                    "title": "AzureDevOps", "description": "Azure Devops/VSTS/TFS", "value": "azdevops"
                },
                {
                    "title": "Gitlab", "description": "Gitlab", "value": "gitlab"
                }
            ],
            "initial": 0
        }
    ];
}
exports.default = cliQuestions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicXVlc3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7O0dBRUc7QUFDSCxTQUFTLFlBQVk7SUFDakIsT0FBTyxDQUFDO1lBQ0osTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLEtBQUs7aUJBQ3ZFO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxLQUFLO2lCQUN2RTthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7U0FDZjtRQUNEO1lBQ0ksTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFVBQVU7WUFDbEIsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLEtBQUs7aUJBQ3BFO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxLQUFLO2lCQUNsRTthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7U0FDZjtRQUNEO1lBQ0ksTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLFlBQVk7WUFDcEIsU0FBUyxFQUFFLDBCQUEwQjtZQUNyQyxTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLFVBQVU7aUJBQ3RGO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUTtpQkFDaEU7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1NBQ2Y7S0FDQSxDQUFBO0FBQ0wsQ0FBQztBQUVELGtCQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb21wdFF1ZXN0aW9uIH0gZnJvbSAnLi4vbW9kZWwvcHJvbXB0X3F1ZXN0aW9uJ1xuXG4vKipcbiAqIEFkZGl0aW9uYWwgcXVlc3Rpb25zIHNob3VsZCBiZSBwbGFjZWQgaGVyZSBhcyB3ZSBhcmUgZXh0ZW5kaW5nIHRoZSBwcm9ncmFtXG4gKi9cbmZ1bmN0aW9uIGNsaVF1ZXN0aW9ucygpOiBBcnJheTxQcm9tcHRRdWVzdGlvbj4ge1xuICAgIHJldHVybiBbe1xuICAgICAgICBcInR5cGVcIjogXCJzZWxlY3RcIixcbiAgICAgICAgXCJuYW1lXCI6IFwicHJvamVjdF90eXBlXCIsXG4gICAgICAgIFwibWVzc2FnZVwiOiBcIlNlbGVjdCBKUyBQcm9qZWN0IHR5cGVcIixcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiU1NSXCIsIFwiZGVzY3JpcHRpb25cIjogXCJTZXJ2ZXJzaWRlIHJlbmRlcmVkXCIsIFwidmFsdWVcIjogXCJzc3JcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiQ1NSXCIsIFwiZGVzY3JpcHRpb25cIjogXCJDbGllbnRzaWRlIHJlbmRlcmVkXCIsIFwidmFsdWVcIjogXCJjc3JcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImluaXRpYWxcIjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBcInR5cGVcIjogXCJzZWxlY3RcIixcbiAgICAgICAgXCJuYW1lXCI6IFwicGxhdGZvcm1cIixcbiAgICAgICAgXCJtZXNzYWdlXCI6IFwiU2VsZWN0IFRhcmdldCBQbGF0Zm9ybVwiLFxuICAgICAgICBcImNob2ljZXNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJBS1NcIiwgXCJkZXNjcmlwdGlvblwiOiBcIkF6dXJlIEt1YmVybmV0ZXJcIiwgXCJ2YWx1ZVwiOiBcImFrc1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJFS1NcIiwgXCJkZXNjcmlwdGlvblwiOiBcIkFXUyBLdWJlcm5ldGVzXCIsIFwidmFsdWVcIjogXCJla3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImluaXRpYWxcIjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBcInR5cGVcIjogXCJzZWxlY3RcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiZGVwbG95bWVudFwiLFxuICAgICAgICBcIm1lc3NhZ2VcIjogXCJTZWxlY3QgVGFyZ2V0IERlcGxveW1lbnRcIixcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiQXp1cmVEZXZPcHNcIiwgXCJkZXNjcmlwdGlvblwiOiBcIkF6dXJlIERldm9wcy9WU1RTL1RGU1wiLCBcInZhbHVlXCI6IFwiYXpkZXZvcHNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiR2l0bGFiXCIsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRsYWJcIiwgXCJ2YWx1ZVwiOiBcImdpdGxhYlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiaW5pdGlhbFwiOiAwXG4gICAgfVxuICAgIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xpUXVlc3Rpb25zXG4iXX0=