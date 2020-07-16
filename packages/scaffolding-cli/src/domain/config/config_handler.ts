import { Static } from "../model/config";
import { shared } from "./file_maps/shared.config"
import { csr, ssr, ssrGke, ssrGkeJenkins, jsTestcafe } from "./file_maps/javascript.config"
import { javaSpring } from "./file_maps/java.config"
import { netcore, netcoreSelenium } from "./file_maps/netcore.config"
import { aksInfra, gkeInfra, gkeInfraJenkins } from "./file_maps/infra.config"

const staticConf = {
    csr,
    ssr,
    ssrGke,
    ssrGkeJenkins,
    aksInfra,
    gkeInfra,
    gkeInfraJenkins,
    jsTestcafe,
    netcoreSelenium,
    netcore,
    javaSpring,
    shared
} as Static

export default staticConf
