# Deployment

The pipeline component (Azure DevOps) is fully prepped for this application and runs the following stages

Current set up albeit all configurable is rigged to work with Azure, AKS, and ACR. 

- Build 
  - unit test
  - pact broker tests
  - pacakge auditing
  - build for docker container 
    - typescript compile
    - [next](https://nextjs.org/) build 
    - Dockerfile can be customized - current set up uses Debian (Buster). Not `slim` purely for additional python dependencies used during the build process
  - vulnerability scan on the packaged container
  - deploy to registry (defaults to ACR)
- Deploy Dev 
  - deploy to an AKS Cluster
  - run integration tests
  - 
- Deploy Prod 
  - deploy to an AKS Cluster
  - run smoke tests

### Kustomize and Kubectl 
K8s cluster is updated with Kustomize and does deploy time replacements of various components such as: host_urls, environment variables, etc...

To gain a more in-depth understading please review the 
