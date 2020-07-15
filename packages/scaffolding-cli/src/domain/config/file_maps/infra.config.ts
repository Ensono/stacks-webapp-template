/* eslint-disable import/prefer-default-export */
import { SingleConfigKey } from "../../model/config"

export const aksInfra = {
    "gitRepo": "",
    "gitRef": "",
    "localPath": "",
    "folderMap": [
        {
            "src": "shared/aux_scripts",
            "dest": "./aux_scripts"
        },
        {
            "src": "shared/README.md",
            "dest": "./README.md"
        },
        {
            "src": "shared/_gitignore",
            "dest": "./.gitignore"
        },
        {
            "src": "build/k8s_manifests/aks",
            "dest": "build/k8s_manifests/aks"
        },
        {
            "src": "build/azDevops/azure/azure-pipeline-infrastructure-aks.yml",
            "dest": "build/azDevops/azure/infra-pipeline.yml"
        },
        {
            "src": "deploy/azure/infra/stacks-aks",
            "dest": "deploy/azure/infra"
        },
        {
            "src": "docs",
            "dest": "docs"
        }
    ]
} as SingleConfigKey

export const gkeInfra = {
    "gitRepo": "",
    "gitRef": "",
    "localPath": "",
    "folderMap": [
        {
            "src": "shared/aux_scripts",
            "dest": "./aux_scripts"
        },
        {
            "src": "shared/README.md",
            "dest": "./README.md"
        },
        {
            "src": "shared/_gitignore",
            "dest": "./.gitignore"
        },
        {
            "src": "build/k8s_manifests/gke",
            "dest": "build/k8s_manifests/gke"
        },
        {
            "src": "build/azDevops/azure/azure-pipeline-infrastructure-gke.yml",
            "dest": "build/azDevops/gcp/infra-pipeline.yml"
        },
        {
            "src": "deploy/gcp/infra/stacks-gke",
            "dest": "deploy/gcp/infra"
        },
        {
            "src": "docs",
            "dest": "docs"
        }
    ]
} as SingleConfigKey

export const gkeInfraJenkins = {
    "gitRepo": "",
    "gitRef": "",
    "localPath": "",
    "folderMap": [
        {
            "src": "shared/aux_scripts",
            "dest": "./aux_scripts"
        },
        {
            "src": "shared/README.md",
            "dest": "./README.md"
        },
        {
            "src": "shared/_gitignore",
            "dest": "./.gitignore"
        },
        {
            "src": "build/k8s_manifests/gke",
            "dest": "build/k8s_manifests/gke"
        },
        {
            "src": "build/jenkins/gcp/infra-gke.Jenkinsfile",
            "dest": "build/jenkins/gcp/Jenkinsfile"
        },
        {
            "src": "deploy/gcp/infra/stacks-gke",
            "dest": "deploy/gcp/infra"
        },
        {
            "src": "docs",
            "dest": "docs"
        }
    ]
} as SingleConfigKey
