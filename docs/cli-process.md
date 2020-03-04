---
id: cli
title: CLI (Command Line Interface)
sidebar_label: CLI
---
# CLI extensions process

The cli process takes in either a config object or CLI answers that construct the same object.

Based on the answers/config the process goes through a certain selection process. 

```json 
{
  "project_name": "test-app-1",
  "project_type": "ssr",
  "platform": "aks",
  "deployment": "azdevops"
}
```

initial version of the options above, the mapping is created by taking the 

`let determined_choice = `${selection.project_type}_${selection.platform}_${selection.deployment}`

the prompt class handles all this and simply hands over to the workers which dynamically select the flow.

The flowSelector class is where users need to implement extensions for their own implementation, you do this by creating a static method and also needs to be added `WorkflowOptions` inside the models/workflow.ts

```javascript 
function WorkflowOptions(): Workflow {
    return {
        ssr_aks_azdevops: FlowSelector.option_ssr_aks_azuredevops,
        ${selection.project_type}_${selection.platform}_${selection.deployment}: FlowSelection.MyMappedFunction
    }
}
```

The implementation is down to user to implement generally this is a process of selecting folder structure based on your new additional logic.

Utils class holds helper methods for operations with FS, such as create a copy of templates in `tmpdir` (OS agnostic) and then moving stuff around based on `FolderMap` defined within the worker method.

<!-- try straight to master -->
