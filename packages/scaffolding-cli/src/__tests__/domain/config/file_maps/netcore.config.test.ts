import { netcore, netcoreSelenium } from '../../../../domain/config/file_maps/netcore.config'
import { SingleConfigKey, ConfigKeyEnum } from '../../../../domain/model/config'

describe("netcore tests", () => {
    /**
     * this needs to be manually bumped on purpose everytime a new option is added
     */
    it("netcore MUST contain folderMap key as an array", () => {
        expect(netcore).toHaveProperty("folderMap")
        expect(netcore.folderMap.length).toBe(9)
    })
    it("netcore MUST contain searchValue", () => {
        expect(netcore).toHaveProperty("folderMap")
        expect(netcore.searchValue).not.toBeEmpty()
    })
    it("netcore definitions should NEVER include master as the ref", () => {
        expect(netcore.gitRef).not.toMatch(`master`)
        expect(netcore.gitRef).not.toMatch(`master`)
    })
    it("netcore gitRepo should be defined and equal", () => {
        expect(netcore.gitRepo).toMatch(`https://github.com/amido/stacks-dotnet.git`)
    })
})


describe("netcoreSelenium tests", () => {
    /**
     * this needs to be manually bumped on purpose everytime a new option is added
     */
    it("netcoreSelenium MUST contain folderMap key as an array", () => {
        expect(netcore).toHaveProperty("folderMap")
        expect(netcore.folderMap.length).toBe(1)
    })
    it("netcoreSelenium MUST contain searchValue", () => {
        expect(netcore).toHaveProperty("folderMap")
        expect(netcore.searchValue).not.toBeEmpty()
    })
    it("netcoreSelenium  gitRef definitions should be empty as it's locally sourced", () => {
        expect(netcore.gitRef).toBe("")
    })
    it("netcoreSelenium gitRepo should be defined and equal", () => {
        expect(netcore.gitRepo).toBe("")
    })
})
