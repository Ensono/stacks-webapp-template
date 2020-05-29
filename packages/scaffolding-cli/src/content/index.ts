export const options = {
    config: {
        describe:
            "Create project from config file",
        description: "Path to config file that will be used in the scaffolding process",
    },
    interactive: {
        describe: "Create project interactively",
        description: "Run with interactive prompts",
    },
    infra: {
        describe: "Create infrastructure only",
        description: "Project agnostic infrastructure"
    }
}

export const main = {
    command: {
        run: {
            command: "run [options]",
            description: "Create a templated solution project"
        },
        test: {
            command: "test [options]",
            description: "Create a standalone test framework"
        }
    },
}

export default {}
