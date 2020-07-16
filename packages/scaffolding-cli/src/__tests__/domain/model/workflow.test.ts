import { WorkflowOptions, Workflow } from "../../../domain/model/workflow"
import { FlowSelector } from "../../../domain/selectors"


const workflow: Workflow = WorkflowOptions()

// const flowSelect = FlowSelector
describe("WorkflowOptions NotYetImplemented tests", () => {
    /**
     * this needs to be manually bumped on purpose everytime a new option is added
     */
    it("netcoreaksjenkins return a not yet implemented", () => {
        expect(workflow.netcoreaksjenkins instanceof Function).toBe(true)
        const netcoreaksjenkins = workflow.netcoreaksjenkins()
        expect(netcoreaksjenkins).toHaveProperty("code")
        expect(netcoreaksjenkins).toHaveProperty("message")
        expect(netcoreaksjenkins.message).toMatch("Not Yet Implemented")
    })
    it("netcoregkejenkins return a not yet implemented", () => {
        expect(workflow.netcoregkejenkins instanceof Function).toBe(true)
        const netcoregkejenkins = workflow.netcoregkejenkins()
        expect(netcoregkejenkins).toHaveProperty("code")
        expect(netcoregkejenkins).toHaveProperty("message")
        expect(netcoregkejenkins.message).toMatch("Not Yet Implemented")
    })

    it("javaspringaksjenkins return a not yet implemented", () => {
        expect(workflow.javaspringaksjenkins instanceof Function).toBe(true)
        const javaspringaksjenkins = workflow.javaspringaksjenkins()
        expect(javaspringaksjenkins).toHaveProperty("code")
        expect(javaspringaksjenkins).toHaveProperty("message")
        expect(javaspringaksjenkins.message).toMatch("Not Yet Implemented")
    })
    it("javaspringgkejenkins return a not yet implemented", () => {
        expect(workflow.javaspringgkejenkins instanceof Function).toBe(true)
        const javaspringgkejenkins = workflow.javaspringgkejenkins()
        expect(javaspringgkejenkins).toHaveProperty("code")
        expect(javaspringgkejenkins).toHaveProperty("message")
        expect(javaspringgkejenkins.message).toMatch("Not Yet Implemented")
    })

})
