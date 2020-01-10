# Kubernetes base yamls files

This folder holds the base files used by kubectl (Kubernetes client) to applly resources to a k8s cluster.

Keep in this folder only raw k8s files taht could be used in the command ***`kubectl apply -f .`***
This will make easy for reading the files without needing any tolling.

## Templating tools (Deployment)
For templating, use the respective folders for the tool you are planning to use:
- `helm-chart` for Helm
- `Kustomization` for kustomize