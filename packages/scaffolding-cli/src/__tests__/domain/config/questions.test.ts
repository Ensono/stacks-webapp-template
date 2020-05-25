import { PromptQuestion } from '../../../domain/model/prompt_question'
import { cliQuestions, advancedQuestions, computedSelection } from '../../../domain/config/questions'
import { CliAnswerModel, PromptAnswer } from '../../../domain/model/prompt_answer'

let mock_answers = <PromptAnswer>{
    businessCompany: "testcomp",
    businessDomain: "test_domain",
    projectName: "test-app-1",
    projectType: "ssr",
    platform: "aks",
    deployment: "azdevops",
    cloudRegion: "uksouth",
    cloudResourceGroup: "my-test-rg",
    businessComponent: "testcomponent",
}

describe("file_mapper tests", () => {
    it("cliQuestions should return an array of objects", () => {
        let test: Array<PromptQuestion> = cliQuestions(mock_answers.projectName)
        expect(test.length).toBe(5)
    })
    it("cliAdvancedQuestions should return an array of objects", () => {
        let test: Array<PromptQuestion> = advancedQuestions()
        expect(test.length).toBe(4)
    })
    it("computedSelection should return an array of objects and undefined item should return %REPLACE_ME%", () => {
        let test: CliAnswerModel = computedSelection(mock_answers)
        expect(test).toHaveProperty("business")
        expect(test.business.project).toMatch(mock_answers.projectName)
    })
})
