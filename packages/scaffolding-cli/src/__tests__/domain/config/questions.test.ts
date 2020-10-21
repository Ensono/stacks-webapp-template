import { PromptQuestion } from '../../../domain/model/prompt_question'
import { cliQuestions, advancedQuestions, computedSelection } from '../../../domain/config/questions'
import { CliAnswerModel, PromptAnswer } from '../../../domain/model/prompt_answer'

const mockAnswers = {
    businessCompany: "testcomp",
    businessDomain: "testDomain",
    projectName: "test-app-1",
    projectType: "ssr",
    platform: "aks",
    deployment: "azdevops",
    cloudRegion: "uksouth",
    cloudResourceGroup: "my-test-rg",
    businessComponent: "testcomponent",
} as PromptAnswer

describe("file_mapper tests", () => {
    it("cliQuestions should return an array of objects", () => {
        const test: Array<PromptQuestion> = cliQuestions(mockAnswers.projectName)
        expect(test.length).toBe(6)
    })
    it("cliAdvancedQuestions should return an array of objects", () => {
        const test: Array<PromptQuestion> = advancedQuestions()
        expect(test.length).toBe(3)
    })
    it("computedSelection should return an array of objects and undefined item should return %REPLACE_ME%", () => {
        const test: CliAnswerModel = computedSelection(mockAnswers)
        expect(test).toHaveProperty("business")
        expect(test.business.project).toMatch(mockAnswers.projectName)
    })
})
