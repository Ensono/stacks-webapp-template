# Amido Stacks Webapp 

Description:
----

The entire project is built around the generation of a completely useable scaffolding for sprint 0. The showcase of a react app, either SSR or CSR being deployed into an existing or brand new K8s cluster - depending on the choices that were made during the bootstrap CLI process.

More details around the internal layout and how to contribute and extend the CLI process can be found [here](./cli.md)


### Deployment Concepts

The deployment principles of build ones and deploy to multiple stages has been applied as best practice for the generated pipeline template.
Templated out pipeline will encompass the build, deploy dev, deploy prod stages. Each stage is comprised of tasks that the user can either enable or disable depending on their setup and currently available tooling such as SonarCloud or vulnerability scanning. 

To read and understand more about testing your contributed changes please read [here](./deployment.md)

### Infrastructure concepts



<!-- This will need to be updated and changed as we progress this along -->
Current limitations:
---
  - SSR Only
  - AKS Only
  - ...
