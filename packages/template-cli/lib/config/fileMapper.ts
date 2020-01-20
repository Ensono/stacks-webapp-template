// const type_enum = Object.freeze()

enum base_flow_type {
    BUILD = "build",
    SOURCE = "src",
    DEPLOY = "deploy",
    DOCS = "docs"   
}

interface fileMapper {
    name: string,
    type: base_flow_type
}
