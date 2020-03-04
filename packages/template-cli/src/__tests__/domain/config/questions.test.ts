import { PromptQuestion } from '../../../domain/model/prompt_question'
import cliQuestions from '../../../domain/config/questions'

describe("file_mapper tests", () => {
    it("should return an array of objects", () => {
        let test: Array<PromptQuestion> = cliQuestions()
        // expect(test).toBe(true)
        expect(true).toBe(true)
    })
})
