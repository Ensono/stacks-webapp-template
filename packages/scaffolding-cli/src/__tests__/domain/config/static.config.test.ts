// import * as conf from '../../../domain/config/static.config.json'
import conf from  '../../../domain/config/static.config.json'
import { Static } from '../../../domain/model/config';

let staticConf: Static = conf as Static;

let currentSupportedPaths = [ "ssr", "csr", "netcore", "java_spring", "netcore_selenium", "js_testcafe" ]

let confKeys = Object.keys(staticConf)


describe("StaticConfig tests", () => {
    /**
     * this needs to be manually bumped on purpose everytime a new option is added
     */
    it("staticConf return an object with only specified keys", () => {
        expect(confKeys.length).toBe(6)
        expect(confKeys).toEqual(expect.arrayContaining(currentSupportedPaths))
    })
    it("staticConf MUST contain folder_map key as an array", () => {
        confKeys.forEach(i => {
            expect(staticConf[i]).toHaveProperty("folder_map")
            expect(staticConf[i].folder_map.length).not.toBe(0)
        })
    })
    it("staticConf definitions should NEVER include master as the ref", () => {
        confKeys.forEach(i => {
            expect(staticConf[i].git_ref).not.toMatch(`master`)
        })
    })
})
