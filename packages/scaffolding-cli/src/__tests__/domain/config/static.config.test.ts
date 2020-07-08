import conf from '../../../domain/config/static.config.json'
import { Static } from '../../../domain/model/config';

const staticConf: Static = conf as Static;

const currentSupportedPaths = ["ssr", "csr", "netcore", "javaSpring", "netcoreSelenium",
    "jsTestcafe", "ssrGke", "aksInfra", "gkeInfra", "ssrGkeJenkins", "ssrGkeJenkins", "shared"]

const confKeys = Object.keys(staticConf)

describe("StaticConfig tests", () => {
    /**
     * this needs to be manually bumped on purpose everytime a new option is added
     */
    it("staticConf return an object with only specified keys", () => {
        expect(confKeys.length).toBe(12)
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
