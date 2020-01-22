enum BaseFlowType {
    BUILD = "build",
    SOURCE = "src",
    DEPLOY = "deploy",
    DOCS = "docs"   
}

interface FileMapper {
    name: string,
    type: BaseFlowType
}

interface SourceStruct {
    path: string,
    replaceFiles: Array<string>,
    replaceVals: Array<string>
}

function getSourceFolders(): Array<SourceStruct> {
    return [{
        path: "templates/build",
        replaceFiles: [""],
        replaceVals: [""]
    }]
}

export {BaseFlowType, FileMapper, getSourceFolders}
