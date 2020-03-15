// Example utils file which can contain helper functions

import { ClientFunction } from "testcafe"

export const getHostname = ClientFunction(() => document.location.hostname)

export const getPathname = ClientFunction(() => document.location.pathname)
