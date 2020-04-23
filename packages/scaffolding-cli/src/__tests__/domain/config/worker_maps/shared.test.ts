import { final_response_message, final_error_message } from '../../../../domain/config/worker_maps/shared'
import { shared } from '../../../../domain/config/worker_maps'
import { SourceControlSection, CloudSection, BusinessSection, TerraformSection } from '../../../../domain/model/prompt_answer'
import { BuildReplaceInput } from '../../../../domain/config/file_mapper'

let test_project_name: string = "test-app-1"
let sample_message: string = "All Successful"
let sample_error_message: string = "All UNSuccessful"

let biz: BusinessSection = <BusinessSection>{
    company: "test",
    project: "test2",
    component: "test3",
    domain: "domain"
}

let cloud: CloudSection = <CloudSection>{
    region: "uksouth",
    resource_group: "my-rg"
}

let scm_obj: SourceControlSection = <SourceControlSection>{
    repo_type: "github",
    repo_name: "A-RB"
}

let terraform_obj: TerraformSection = <TerraformSection>{
    backend_storage: "foo",
    backend_storage_container: "container",
    backend_storage_rg: "tg"
}

let files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.md", "**/*.properties"],
        values: {
            "project_name": test_project_name
        }
    },
    {
        files: ["**/*-pipeline.yml"],
        values: {
            "stacks-webapp-template/packages/scaffolding-cli/templates": scm_obj.repo_name,
            "packages/scaffolding-cli/templates/": "",
            "self_repo_tf_src: deploy/azure/infra/stacks-aks": "self_repo_tf_src: deploy/azure/infra",
            // "amido-stacks-nonprod-node": "REPLACE_ME_FOR_RG_NAME",
            // "amidostacksnonprodnode": "REPLACE_ME_FOR_ACR_NAME", // cloud_obj?.acr_name
            "company: amido": `company: ${biz.company}`,
            "project: stacks": `project: ${biz.project}`,
            "domain: node": `domain: ${biz.domain}`,
            "component: node": `domain: ${biz.component}`,
            "nonprod.amidostacks.com": "REPLACE_ME_FOR_DOMAIN",
            "nonprod.amidostacks.internal": "REPLACE_ME_FOR_INTERNAL_DOMAIN",
            "amido-stacks-infra-credentials-nonprod": "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
            "tf_state_storage: amidostackstfstategbl": `tf_state_storage: ${terraform_obj.backend_storage}`,
            "tf_state_rg: amido-stacks-rg-uks": `tf_state_rg: ${terraform_obj.backend_storage_rg}`,
            "tf_state_container: tfstate": `tf_state_container: ${terraform_obj?.backend_storage_container}`,
            "tf_state_key: sharedservices": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_SHARED_SERVICES%`,
            "terraform_state_workspace: nonprod": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
        }
    }
]

describe("shared worker_maps tests", () => {
   it("final_response_message should return a formatted string", () => {
        let test: string = final_response_message(test_project_name, sample_message)
        expect(test).toMatch("All Successful")
    })
    it("final_response_message should return a formatted string with config description", () => {
        let test: string = final_response_message(test_project_name, sample_message, true)
        expect(test).toMatch("Config file has been")
    })
    it("final_error_message should return a formatted string", () => {
        let test: string = final_error_message(sample_error_message)
        expect(test).toMatch("All UNSuccessful")
    })
    it("final_response_message should return a formatted string with a code", () => {
        let test: string = final_error_message(sample_error_message, -12)
        expect(test).toMatch(sample_error_message)
        expect(test).toMatch("code:")
    })
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = shared.in_files({ project_name: test_project_name, business_obj: biz, terraform_obj: terraform_obj, scm_obj: scm_obj})
        expect(test).toStrictEqual(files)
    })
    
})
