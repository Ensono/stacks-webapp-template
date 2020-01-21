declare enum BaseFlowType {
    BUILD = "build",
    SOURCE = "src",
    DEPLOY = "deploy",
    DOCS = "docs"
}
interface fileMapper {
    name: string;
    type: BaseFlowType;
}
interface sourceStruct {
    path: string;
    replaceFiles: Array<string>;
    replaceVals: Array<string>;
}
declare function getSourceFolders(): Array<sourceStruct>;
export { BaseFlowType, fileMapper, getSourceFolders };
