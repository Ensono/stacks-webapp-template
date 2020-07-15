import { SingleConfigKey } from "../../model/config"

export const netcoreSelenium = {
    "gitRepo": "",
    "gitRef": "",
    "localPath": "",
    "searchValue": "xxAMIDOxx.xxSTACKSxx",
    "folderMap": [
        {
            "src": "test/xxAMIDOxx.xxSTACKSxx.E2E.Selenium",
            "dest": ""
        }
    ]
} as SingleConfigKey

export const netcore = {
    "gitRepo": "https://github.com/amido/stacks-dotnet.git",
    "gitRef": "a574de0e8b8d9ec4c0c7bafc89d29f7b01a79bd1",
    "localPath": "src/netcore",
    "searchValue": "xxAMIDOxx.xxSTACKSxx",
    "folderMap": [
        {
            "src": "shared/aux_scripts",
            "dest": "./aux_scripts"
        },
        {
            "src": "shared/netcore.README.md",
            "dest": "./README.md"
        },
        {
            "src": "src/netcore/build/azDevops/azure/templates/steps/build-netcore.yml",
            "dest": "build/azDevops/azure/templates/steps/build-netcore.yml"
        },
        {
            "src": "src/netcore/build/azDevops/azure/azure-pipelines-netcore-k8s.yml",
            "dest": "build/azDevops/azure/api-pipeline.yml"
        },
        {
            "src": "src/netcore/deploy/azure/app/kube",
            "dest": "deploy/azure/app"
        },
        {
            "src": "src/netcore/deploy/k8s/app/base_api-deploy.yml",
            "dest": "deploy/k8s/app/base_api-deploy.yml"
        },
        {
            "src": "test/xxAMIDOxx.xxSTACKSxx.E2E.Selenium",
            "dest": "test"
        },
        {
            "src": "docs",
            "dest": "docs"
        },
        {
            "src": "src/netcore/src",
            "dest": "src"
        }
    ]
} as SingleConfigKey
