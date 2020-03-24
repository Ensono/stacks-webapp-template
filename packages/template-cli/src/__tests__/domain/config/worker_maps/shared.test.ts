import { final_response_message, final_error_message } from '../../../../domain/config/worker_maps/shared'

let test_project_name: string = "test-app-1"
let sample_message: string = "All Successful"
let sample_error_message: string = "All UNSuccessful"

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
    
})
