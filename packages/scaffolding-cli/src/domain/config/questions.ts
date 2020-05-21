import {PromptQuestion} from "../model/prompt_question"
import {PromptAnswer, CliAnswerModel} from "../model/prompt_answer"

export function computedSelection(
    cliOrConfigAnswer: PromptAnswer,
): CliAnswerModel {
    return <CliAnswerModel>{
        project_name: cliOrConfigAnswer.project_name,
        project_type: cliOrConfigAnswer.project_type,
        deployment: cliOrConfigAnswer.deployment,
        platform: cliOrConfigAnswer.platform || "any",
        enable_advanced: cliOrConfigAnswer.enable_advanced || false,
        business: {
            company: cliOrConfigAnswer.business_company,
            project: cliOrConfigAnswer.project_name,
            domain: cliOrConfigAnswer.business_domain,
            component:
                cliOrConfigAnswer.business_component || "COMPONENT_REPLACE_ME",
        },
        cloud: {
            region: cliOrConfigAnswer.cloud_region || "REGION_REPLACE_ME",
        },
        terraform: {
            backend_storage:
                cliOrConfigAnswer.terraform_backend_storage ||
                "BACKEND_STORAGE_REPLACE_ME",
        },
        source_control: {
            repo_name:
                cliOrConfigAnswer.source_control_repo_name ||
                "REPO_NAME_REPLACE_ME",
        },
        networking: {
            base_domain:
                cliOrConfigAnswer.networking_base_domain ||
                "REPO_NAME_REPLACE_ME",
        },
    }
}

/**
 * Additional questions should be placed here as we are extending the program
 */
export function cliQuestions(
    default_project_name: string,
): Array<PromptQuestion> {
    return [
        {
            type: "text",
            name: "business_company",
            message: "Please provide the company name",
            initial: "amido",
        },
        {
            type: "text",
            name: "project_name",
            message: "Please provide the project name",
            initial: default_project_name,
        },
        {
            type: "select",
            name: "project_type",
            message: "Select Project type",
            choices: [
                {
                    title: "React app with server side rendering",
                    description:
                        "React, SSR, node, next.js, express, typescript",
                    value: "ssr",
                },
                {
                    title: "React CSRReact app with client side rendering",
                    description: "React, CSR, typescript",
                    value: "csr",
                },
                {
                    title: "API with .NET",
                    description: "api, netcore, server, restful",
                    value: "netcore",
                },
                {
                    title: "API with Java",
                    description: "api, java, springboot",
                    value: "java_spring",
                },
                {
                    title: "Selenium framework with .NET",
                    description:
                        "automation, bddfy, xunit, webdriver, netcore, e2e, standalone",
                    value: "test_netcore_selenium",
                },
                {
                    title: "TestCafe framework with Typescript",
                    description:
                        "in-browser, automation, node.js, javascript, bdd, cross browser",
                    value: "test_js_testcafe",
                },
                {
                    title: "Cloud platform shared services",
                    description:
                        "terraform, azure, gcp, gke, aks, azure devops (tfs), jenkins",
                    value: "infra",
                },
            ],
            initial: 0,
        },
        {
            type: "text",
            name: "business_domain",
            message: "Please provide scope (domain)",
            description:
                "Used for templated project naming conventions, Terraform name spacing conventions, Kubetetes configuration.",
            initial: "menu-api",
        },
        {
            type: "select",
            name: "deployment",
            message: "Select Pipeline Tool",
            choices: [
                {
                    title: "AzureDevOps",
                    description: "Azure Devops/VSTS/TFS",
                    value: "azdevops",
                },
                {
                    title: "Jenkins",
                    description: "Jenkins CI/CD",
                    value: "jenkins",
                },
            ],
            initial: 0,
        },
    ]
}

export function advancedQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "text",
            name: "source_control_repo_name",
            message: "Please provide version control repository name",
            initial: "stacks-repo",
        },
        {
            type: "text",
            name: "cloud_region",
            message: "Please provide platform service region",
            initial: "uksouth",
        },
        {
            type: "select",
            name: "terraform_backend_storage",
            message: "Select Terraform remote state storage service?",
            choices: [
                {
                    title: "Azure",
                    description: "Azure Blob",
                    value: "azure_blob",
                },
                {
                    title: "AWS S3",
                    description: "S3 bucket",
                    value: "aws_s3",
                },
                {
                    title: "GCS",
                    description: "GCP Storage bucket",
                    value: "gcp_gcs",
                },
            ],
            initial: 0,
        },
        {
            type: "text",
            name: "networking_base_domain",
            message: "Provide host name (DNS domain)",
            initial: "app.replaceme.com",
        },
    ]
}

export function platformQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "select",
            name: "platform",
            message: "Select Target Cloud Platform",
            choices: [
                {
                    title: "AKS",
                    description: "Azure Kubernetes",
                    value: "aks",
                },
                {
                    title: "GKE",
                    description: "Google Kubernetes Engine",
                    value: "gke",
                },
            ],
            initial: 0,
        },
        {
            type: "confirm",
            name: "enable_advanced",
            message: "Continue to additional project configuration",
            initial: true,
        },
    ]
}

export function testQuestions(): Array<PromptQuestion> {
    return []
}
