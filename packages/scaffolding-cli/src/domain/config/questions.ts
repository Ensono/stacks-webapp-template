import { PromptQuestion } from "../model/prompt_question"
import { PromptAnswer, CliAnswerModel, ProjectTypeEnum } from "../model/prompt_answer"

export function computedSelection(
    cliOrConfigAnswer: PromptAnswer,
): CliAnswerModel {
    return {
        projectName: cliOrConfigAnswer.projectName,
        projectType: cliOrConfigAnswer.projectType,
        deployment: cliOrConfigAnswer.deployment || "azdevops",
        platform: cliOrConfigAnswer.platform || "any",
        enableAdvanced: cliOrConfigAnswer.enableAdvanced || false,
        business: {
            company: cliOrConfigAnswer.businessCompany,
            project: cliOrConfigAnswer.projectName,
            domain: cliOrConfigAnswer.businessDomain,
            component:
                cliOrConfigAnswer.businessComponent || "%REPLACE_ME_FOR_COMPONENT%",
        },
        cloud: {
            region: cliOrConfigAnswer.cloudRegion || "%REPLACE_ME_FOR_REGION%",
        },
        terraform: {
            backendStorage:
                cliOrConfigAnswer.terraformBackendStorage ||
                "%REPLACE_ME_FOR_BACKEND_STORAGE_ACCOUNT%",
            backendStorageRg:
                cliOrConfigAnswer.terraformBackendStorageRg ||
                "%REPLACE_ME_FOR_BACKEND_STORAGE_RG%",
            backendStorageContainer:
                cliOrConfigAnswer.terraformBackendStorageContainer ||
                "%REPLACE_ME_FOR_BACKEND_STORAGE_CONTAINER%",
        },
        sourceControl: {
            repoName:
                cliOrConfigAnswer.sourceControlRepoName ||
                "%REPLACE_ME_FOR_REPO_NAME%",
        },
        networking: {
            baseDomain:
                cliOrConfigAnswer.networkingBaseDomain ||
                "%REPLACE_ME_FOR_BASE_DOMAIN_NAME%",
        },
        javaspring: {
            namespace: cliOrConfigAnswer.javaTldNamespace ||
            "com",
            testingFramework: cliOrConfigAnswer.javaTestingFramework ||
            "serenity"
        }
    } as CliAnswerModel
}

export const sharedInitialQs = (defaultProjectName: string): Array<PromptQuestion> => {
    return [{
        type: "text",
        name: "businessCompany",
        message: "Enter company name",
        initial: "amido",
    },
    {
        type: "text",
        name: "projectName",
        message: "Enter project name",
        initial: defaultProjectName,
    }]
}

export const sharedPostQs = (): Array<PromptQuestion> => {
    return [
        {
            type: "text",
            name: "businessDomain",
            message: "Enter scope (domain)",
            initial: "menu-api",
        }
        // {
        //     type: "select",
        //     name: "deployment",
        //     message: "Select Pipeline Tool",
        //     choices: [
        //         {
        //             title: "AzureDevOps",
        //             description: "Azure Devops/VSTS/TFS",
        //             value: "azdevops",
        //         },
        //         {
        //             title: "Jenkins",
        //             description: "Jenkins CI/CD",
        //             value: "jenkins",
        //         },
        //     ],
        //     initial: 0,
        // }
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
        message: "Select project type",
        choices: [
            {
                title: "Cloud platform shared services (pre-req)",
                description:
                    "terraform, azure, gcp, gke, aks, azure devops (tfs)",
                value: "infra",
            },
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
                title: "API with .NET and CQRS",
                description: "api, netcore, server, restfull",
                value: "netcore",
            },
            {
                title: "API with Java",
                description: "api, java, springboot",
                value: "javaspring",
            },
            {
                title: "API with Java and CQRS",
                description: "api, java, springboot",
                value: "javaspringcqrs",
            },
        ],
        initial: 0,
    }

    const questions: Array<PromptQuestion> = Array<PromptQuestion>().concat(platformQuestions(), [custom], sharedInitialQs(defaultProjectName), sharedPostQs(), enableAdvancedQuestions())
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
                title: "TypeScript using TestCafe framework",
                description:
                    "in-browser, automation, node.js, javascript, bdd, cross browser",
                value: "testjstestcafe",
            },
            {
                title: ".NET using Selenium framework",
                description:
                    "automation, bddfy, xunit, webdriver, netcore, e2e, standalone",
                value: "testnetcoreselenium",
            },
            {
                title: "Java using Serenity framework",
                description:
                    "java, serenity, cucumber, bdd, e2e",
                value: "testjavaserenity",
            }
        ],
        initial: 0,
    }
    const questions: Array<PromptQuestion> = Array<PromptQuestion>().concat([custom], sharedInitialQs(defaultProjectName), sharedPostQs())
    return questions
}

export function enableAdvancedQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "confirm",
            name: "enableAdvanced",
            message: "Continue to additional project configuration?",
            initial: true,
        },
    ]
}

export function advancedQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "text",
            name: "sourceControlRepoName",
            message: "Enter version control repository name",
            initial: "stacks-repo",
        },
        {
            type: "text",
            name: "cloudRegion",
            message: "Enter cloud platform region",
            initial: "northeurope",
        },
        {
            type: "text",
            name: "networkingBaseDomain",
            message: "Enter host name (DNS domain)",
            initial: "app.replaceme.com",
        },
    ]
}

export function platformQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "select",
            name: "platform",
            message: "Select cloud platform",
            choices: [
                {
                    title: "Azure",
                    description: "Azure Kubernetes Service (AKS)",
                    value: "aks",
                },
                {
                    title: "Google Cloud Platform",
                    description: "Google Kubernetes Engine (GKE)",
                    value: "gke",
                },
            ],
            initial: 0,
        },
    ]
}

export const language: {[key in ProjectTypeEnum]?: Function} = {
    [ProjectTypeEnum.JAVASPRING]: () => [...javaQuestions(), ...javaTestingQuestions()],
    [ProjectTypeEnum.JAVASPRINGCQRS]: () => [...javaQuestions(), ...javaTestingQuestions()],
    [ProjectTypeEnum.TESTJAVASERENTIY]: javaQuestions,
}

export const platform: {[key: string]: Function} = {
}

export function javaQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "text",
            name: "javaTldNamespace",
            message: "Enter package prefix - will be prepended to companyName.projectName previously supplied, e.g. com or uk.co",
            initial: "com",
        }
    ]
}

export function javaTestingQuestions(): Array<PromptQuestion> {
    return [
        {
            type: "select",
            name: "javaTestingFramework",
            message: "Select testing framework",
            choices: [
                {
                    title: "Serenity",
                    value: "serenity",
                },
                {
                    title: "Karate",
                    value: "karate",
                },
            ],
            initial: 0,
        }
    ]
}
