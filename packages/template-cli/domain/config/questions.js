'use strict'
Object.defineProperty(exports, '__esModule', {value: true})
/**
 * Additional questions should be placed here as we are extending the program
 */
function cliQuestions() {
  return [
    {
      type: 'select',
      name: 'project_type',
      message: 'Select JS Project type',
      choices: [
        {
          title: 'SSR',
          description: 'Serverside rendered',
          value: 'ssr',
        },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'platform',
      message: 'Select Target Platform',
      choices: [
        {
          title: 'AKS',
          description: 'Azure Kubernetes',
          value: 'aks',
        },
      ],
      initial: 0,
    },
    {
      type: 'select',
      name: 'deployment',
      message: 'Select Target Deployment',
      choices: [
        {
          title: 'AzureDevOps',
          description: 'Azure Devops/VSTS/TFS',
          value: 'azdevops',
        },
      ],
      initial: 0,
    },
  ]
}
exports.default = cliQuestions
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicXVlc3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7O0dBRUc7QUFDSCxTQUFTLFlBQVk7SUFDakIsT0FBTyxDQUFDO1lBQ0osTUFBTSxFQUFFLFFBQVE7WUFDaEIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsU0FBUyxFQUFFLHdCQUF3QjtZQUNuQyxTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLEtBQUs7aUJBQ3ZFO2FBQ0o7WUFDRCxTQUFTLEVBQUUsQ0FBQztTQUNmO1FBQ0Q7WUFDSSxNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsVUFBVTtZQUNsQixTQUFTLEVBQUUsd0JBQXdCO1lBQ25DLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsS0FBSztpQkFDcEU7YUFDSjtZQUNELFNBQVMsRUFBRSxDQUFDO1NBQ2Y7UUFDRDtZQUNJLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFNBQVMsRUFBRSwwQkFBMEI7WUFDckMsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLE9BQU8sRUFBRSxVQUFVO2lCQUN0RjthQUNKO1lBQ0QsU0FBUyxFQUFFLENBQUM7U0FDZjtLQUNBLENBQUE7QUFDTCxDQUFDO0FBRUQsa0JBQWUsWUFBWSxDQUFBIn0=
