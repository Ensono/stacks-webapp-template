# Templated Pipelines

Whilst there is a full CI/CD process for contributed changes to ensure exisiting functionality doesn't break if you want to ensure your PR passes, please follow the steps in the [cli](./cli.md) docs to create a templated out app with and *-pipeline.yml and point to your own CI/CD tooling.

All changes need to be made inside the `packages/template-cli/templates/build/*`. 

TFS ONLY:
  - The generated pipeline yaml is only comprised of steps and jobs templated out from other repo 

### Basic Guide 



Adding more steps 


### Build container definitions
All build containers used by the pipelines are stored and managed from `libs/images/*`, shbould you need to change or create an additional one please follow the existing structure and create a folder for your specific use case. 

e.g. create a folder called `pip-cypress` and within it include a 
