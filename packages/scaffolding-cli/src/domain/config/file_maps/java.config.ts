/* eslint-disable import/prefer-default-export */
import { SingleConfigKey } from "../../model/config"

export const javaSpring = {
    "gitRepo": "https://github.com/amido/stacks-java.git",
    "gitRef": "7c8fd7ff1c3017b1101119f3e3345083dae83c24",
    "localPath": "src/java_spring",
    "searchValue": "com.xxAMIDOxx.xxSTACKSxx",
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
            "src": "src/java_spring/build/azDevops/azure/templates/steps/build-java.yml",
            "dest": "build/azDevops/azure/templates/steps/build-java.yml"
        },
        {
            "src": "src/java_spring/build/azDevops/azure/azure-pipelines-javaspring-k8s.yml",
            "dest": "build/azDevops/azure/api-pipeline.yml"
        },
        {
            "src": "src/java_spring/deploy/azure/app/kube",
            "dest": "deploy/azure/app"
        },
        {
            "src": "src/java_spring/deploy/k8s/app/base_api-deploy.yml",
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
            "src": "src/java_spring/java",
            "dest": "java"
        }
    ]
} as SingleConfigKey
