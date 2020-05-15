import { PromptQuestion } from '../../../domain/model/prompt_question'
import { cliQuestions, cliAdvancedQuestions, computedSelection } from '../../../domain/config/questions'
import { CliAnswerModel, PromptAnswer } from '../../../domain/model/prompt_answer'

let mock_answers = <PromptAnswer>{
    project_name: "test-app-1",
    project_type: "ssr",
    platform: "aks",
    deployment: "azdevops",
    create_config: true,
    advanced_config: true,
    cloud_region: "uksouth",
    cloud_resource_group: "my-test-rg",
    business_company: "testcomp",
    business_component: "testcomponent"
}

describe("file_mapper tests", () => {
    it("cliQuestions should return an array of objects", () => {
        let test: Array<PromptQuestion> = cliQuestions(mock_answers.project_name)
        expect(test.length).toBe(5)
    })
    it("cliAdvancedQuestions should return an array of objects", () => {
        let test: Array<PromptQuestion> = cliAdvancedQuestions()
        expect(test.length).toBe(7)
    })
    it("computedSelection should return an array of objects and undefined item should return %REPLACE_ME%", () => {
        let test: CliAnswerModel = computedSelection(mock_answers)
        expect(test).toHaveProperty("business")
        expect(test.business.project).toMatch("REPLACE_ME")
    })
})
