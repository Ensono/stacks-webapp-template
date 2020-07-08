import * as shared from './shared'
import * as ssr from './ssr_aks_tfs'
import * as gkeSsr from './ssr_gke_tfs'
import * as gkeSsrJenkins from './ssr_gke_jenkins'
import * as netcore from './netcore_aks_tfs'
import * as javaSpring from './java_spring_aks_tfs'
import * as csr from './csr_aks_tfs'
import * as netcoreSelenium from './netcore_selenium_tfs'
import * as infraAks from './infra_aks_tfs'
import * as infraGke from './infra_gke_tfs'
import * as infraGkeJenkins from './infra_gke_jenkins'
import * as jsTestcafe from './js_testcafe_tfs'

export {
    ssr,
    gkeSsrJenkins,
    gkeSsr,
    netcore,
    javaSpring,
    csr,
    shared,
    netcoreSelenium,
    infraAks,
    infraGke,
    infraGkeJenkins,
    jsTestcafe
}
