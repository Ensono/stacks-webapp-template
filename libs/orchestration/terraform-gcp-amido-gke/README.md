# GKE bootstrap

this module wraps around existing GruntWorks terraform modules for network and GKE bootstrap


Pre-requisites:
---
- GCP project name
- GCP service account
- enable APIs (once K8s enabled a lot should be enabled by default) 
    - Kubernetes
    - IAM
    - network


#### Enable APIs

you can do that by visiting this page: `https://console.developers.google.com/apis/api/container.googleapis.com/overview?project=$PROJECT_ID`

PROJECT_ID will be the one
