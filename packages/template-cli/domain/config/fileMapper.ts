// const type_enum = Object.freeze()

enum BaseFlowType {
    BUILD = "build",
    SOURCE = "src",
    DEPLOY = "deploy",
    DOCS = "docs"   
}

interface fileMapper {
    name: string,
    type: BaseFlowType
}

interface sourceStruct {
    path: string,
    replaceFiles: Array<string>,
    replaceVals: Array<string>
}

function getSourceFolders(): Array<sourceStruct> {
    return [{
        path: "templates/build",
        replaceFiles: [""],
        replaceVals: [""]
    }]
}

export {BaseFlowType, fileMapper, getSourceFolders }
