import { PromptQuestion } from "../model/prompt_question"
import { PromptAnswer, CliAnswerModel } from "../model/prompt_answer"

export function computedSelection(
    cliOrConfigAnswer: PromptAnswer,
): CliAnswerModel {
    return {
        projectName: cliOrConfigAnswer.projectName,
        projectType: cliOrConfigAnswer.projectType,
        deployment: cliOrConfigAnswer.deployment,
        platform: cliOrConfigAnswer.platform || "any",
        enableAdvanced: cliOrConfigAnswer.enableAdvanced || false,
        business: {
            company: cliOrConfigAnswer.businessCompany,
            project: cliOrConfigAnswer.projectName,
            domain: cliOrConfigAnswer.businessDomain,
            component:
                cliOrConfigAnswer.businessComponent || "COMPONENT_REPLACE_ME",
        },
        cloud: {
            region: cliOrConfigAnswer.cloudRegion || "REGION_REPLACE_ME",
        },
        terraform: {
            backendStorage:
                cliOrConfigAnswer.terraformBackendStorage ||
                "BACKEND_STORAGE_REPLACE_ME",
        },
        sourceControl: {
            repoName:
                cliOrConfigAnswer.sourceControlRepoName ||
                "REPO_NAME_REPLACE_ME",
        },
        networking: {
            baseDomain:
                cliOrConfigAnswer.networkingBaseDomain ||
                "REPO_NAME_REPLACE_ME",
        },
    } as CliAnswerModel
}

export const sharedInitialQs = (defaultProjectName: string): Array<PromptQuestion> => {
    return [{
        type: "text",
        name: "businessCompany",
        message: "Please provide the company name",
        initial: "amido",
    },
    {
        type: "text",
        name: "projectName",
        message: "Please provide the project name",
        initial: defaultProjectName,
    }]
}

export const sharedPostQs = (): Array<PromptQuestion> => {
    return [
        {
            type: "text",
            name: "businessDomain",
            message: "Please provide test scope (domain)",
            description:
                "Used for test scope with framework naming conventions.",
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
        }
    ]
}

/**
 * Additional questions should be placed here as we are extending the program
 */
export function cliQuestions(
    defaultProjectName: string,
): Array<PromptQuestion> {

    // let questions: Array<PromptQuestion> = Array<PromptQuestion
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const custom: PromptQuestion = <PromptQuestion>{
        type: "select",
        name: "projectType",
        message: "Select Project type",
        choices: [
            {
                title: "React app with server side rendering",
                description:
                    "React, SSR, node, next.js, express, typescript",
                value: "ssr",
            },
            {
                title: "React app with client side rendering",
                description: "React, CSR, typescript",
                value: "csr",
            },
            {
                title: "API with .NET",
                description: "api, netcore, server, restfull",
                value: "netcore",
            },
            {
                title: "API with Java",
                description: "api, java, springboot",
                value: "javaspring",
            },
            {
                title: "Cloud platform shared services",
                description:
                    "terraform, azure, gcp, gke, aks, azure devops (tfs), jenkins",
                value: "infra",
            },
        ],
        initial: 0,
    }

    const questions: Array<PromptQuestion> = Array<PromptQuestion>().concat(sharedInitialQs(defaultProjectName), [custom], sharedPostQs(), platformQuestions())
    return questions
}

export function cliTestQuestions(
    defaultProjectName: string,
): Array<PromptQuestion> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const custom: PromptQuestion = <PromptQuestion>{
        type: "select",
        name: "projectType",
        message: "Select test framework",
        choices: [
            {
                title: "Selenium framework with .NET",
                description:
                    "automation, bddfy, xunit, webdriver, netcore, e2e, standalone",
                value: "testnetcoreselenium",
            },
            {
                title: "TestCafe framework with Typescript",
                description:
                    "in-browser, automation, node.js, javascript, bdd, cross browser",
                value: "testjstestcafe",
            }
        ],
        initial: 0,
    }
    const questions: Array<PromptQuestion> = Array<PromptQuestion>().concat(sharedInitialQs(defaultProjectName), [custom], sharedPostQs())
    return questions
}

export function advancedQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "text",
            name: "sourceControlRepoName",
            message: "Please provide version control repository name",
            initial: "stacks-repo",
        },
        {
            type: "text",
            name: "cloudRegion",
            message: "Please provide platform service region",
            initial: "uksouth",
        },
        {
            type: "select",
            name: "terraformBackendStorage",
            message: "Select Terraform remote state storage service?",
            choices: [
                {
                    title: "Azure",
                    description: "Azure Blob",
                    value: "azureBlob",
                },
                {
                    title: "AWS S3",
                    description: "S3 bucket",
                    value: "awsS3",
                },
                {
                    title: "GCS",
                    description: "GCP Storage bucket",
                    value: "gcpGcs",
                },
            ],
            initial: 0,
        },
        {
            type: "text",
            name: "networkingBaseDomain",
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
            name: "enableAdvanced",
            message: "Continue to additional project configuration?",
            initial: true,
        },
    ]
}

export function testQuestions(): Array<PromptQuestion> {
    return []
}
