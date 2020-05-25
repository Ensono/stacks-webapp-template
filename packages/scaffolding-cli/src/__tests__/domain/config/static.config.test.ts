// import * as conf from '../../../domain/config/static.config.json'
import conf from  '../../../domain/config/static.config.json'
import { Static } from '../../../domain/model/config';

let staticConf: Static = conf as Static;

let currentSupportedPaths = [ "ssr", "csr", "netcore", "netcoreSelenium", "netcoreSelenium", "jsTestcafe", "ssrGke", "aksInfra" ]

let confKeys = Object.keys(staticConf)


describe("StaticConfig tests", () => {
    /**
     * this needs to be manually bumped on purpose everytime a new option is added
     */
    it("staticConf return an object with only specified keys", () => {
        expect(confKeys.length).toBe(8)
        expect(confKeys).toEqual(expect.arrayContaining(currentSupportedPaths))
    })
    it("staticConf MUST contain folderMap key as an array", () => {
        confKeys.forEach(i => {
            expect(staticConf[i]).toHaveProperty("folderMap")
            expect(staticConf[i].folderMap.length).not.toBe(0)
        })
    })
    it("staticConf definitions should NEVER include master as the ref", () => {
        confKeys.forEach(i => {
            expect(staticConf[i].gitRef).not.toMatch(`master`)
        })
    })
})
