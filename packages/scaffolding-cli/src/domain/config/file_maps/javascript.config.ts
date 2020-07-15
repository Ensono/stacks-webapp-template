/* eslint-disable import/prefer-default-export */
import { SingleConfigKey } from "../../model/config"
import { shared } from "./shared.config"

export const ssr = {
    gitRepo: "",
    gitRef: "",
    localPath: "",
    folderMap: [
        {
            src: "shared/aux_scripts",
            dest: "./aux_scripts"
        },
        {
            src: "shared/README.md",
            dest: "./README.md"
        },
        {
            src: "shared/_gitignore",
            dest: "./.gitignore"
        },
        {
            src: "build/azDevops/azure/k8s_manifests/aks",
            dest: "build/azDevops/azure/k8s_manifests"
        },
        {
            src: "build/azDevops/azure/templates",
            dest: "build/azDevops/azure/templates"
        },
        {
            src: "build/azDevops/azure/azure-pipelines-ssr-aks.yml",
            dest: "build/azDevops/azure/app-pipeline.yml"
        },
        {
            src: "deploy/azure/app/kube",
            dest: "deploy/azure/app"
        },
        {
            src: "deploy/k8s",
            dest: "deploy/k8s"
        },
        {
            src: "test/testcafe",
            dest: "test/testcafe"
        },
        {
            src: "docs",
            dest: "docs"
        },
        {
            src: "src/ssr",
            dest: "src"
        }, 
        // ...shared.folderMap
    ]
} as SingleConfigKey

export const csr = {
    gitRepo: "",
    gitRef: "",
    localPath: "",
    folderMap: [
        {
            src: "shared/aux_scripts",
            dest: "./aux_scripts"
        },
        {
            src: "shared/README.md",
            dest: "./README.md"
        },
        {
            src: "shared/_gitignore",
            dest: "./.gitignore"
        },
        {
            src: "build/azDevops/azure/templates/steps/build-csr.yml",
            dest: "build/azDevops/azure/templates/steps/build-csr.yml"
        },
        {
            src: "build/azDevops/azure/azure-pipeline-csr-azure.yml",
            dest: "build/azDevops/azure/app-pipeline.yml"
        },
        {
            src: "deploy/azure/app/csr",
            dest: "deploy/azure/app"
        },
        {
            src: "docs",
            dest: "docs"
        },
        {
            src: "src/csr",
            dest: "src"
        }
    ]
} as SingleConfigKey

export const ssrGke = {
    gitRepo: "",
    gitRef: "",
    localPath: "",
    folderMap: [
        {
            src: "shared/aux_scripts",
            dest: "./aux_scripts"
        },
        {
            src: "shared/README.md",
            dest: "./README.md"
        },
        {
            src: "shared/_gitignore",
            dest: "./.gitignore"
        },
        {
            src: "build/azDevops/azure/templates/steps/build-node.yml",
            dest: "build/azDevops/gcp/templates/steps/build-node.yml"
        },
        {
            src: "build/azDevops/azure/azure-pipelines-ssr-gke.yml",
            dest: "build/azDevops/gcp/app-pipeline.yml"
        },
        {
            src: "deploy/gcp/app/kube",
            dest: "deploy/gcp/app"
        },
        {
            src: "deploy/k8s/app/base_gke-app-deploy.yml",
            dest: "deploy/k8s/app/base_gke-app-deploy.yml"
        },
        {
            src: "test",
            dest: "test"
        },
        {
            src: "docs",
            dest: "docs"
        },
        {
            src: "src/ssr",
            dest: "src"
        }
    ]
} as SingleConfigKey

export const ssrGkeJenkins = {
    gitRepo: "",
    gitRef: "",
    localPath: "",
    folderMap: [
        {
            src: "shared/aux_scripts",
            dest: "./aux_scripts"
        },
        {
            src: "shared/README.md",
            dest: "./README.md"
        },
        {
            src: "shared/_gitignore",
            dest: "./.gitignore"
        },
        {
            src: "build/jenkins/gcp/ssr-gke.Jenkinsfile",
            dest: "build/jenkins/gcp/Jenkinsfile"
        },
        {
            src: "deploy/gcp/app/kube",
            dest: "deploy/gcp/app"
        },
        {
            src: "deploy/k8s/app/base_gke-app-deploy.yml",
            dest: "deploy/k8s/app/base_gke-app-deploy.yml"
        },
        {
            src: "test",
            dest: "test"
        },
        {
            src: "docs",
            dest: "docs"
        },
        {
            src: "src/ssr",
            dest: "src"
        }
    ]
} as SingleConfigKey

export const jsTestcafe = {
    gitRepo: "",
    gitRef: "",
    localPath: "",
    folderMap: [
        {
            src: "test/testcafe",
            dest: ""
        },
        {
            src: "build/azDevops/azure/azure-pipeline-post-deploy-testcafe.yml",
            dest: "build/azDevops/azure/azure-pipeline-post-deploy-testcafe.yml"
        }
    ]
} as SingleConfigKey
