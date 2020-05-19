#!/usr/bin/env node

import { Stub, Server } from '@pact-foundation/pact-node'
import { pactsOutDir } from '../index'

//Todo: make this dynamic
const port = 8639

export const server = new Stub({
    port: port,
    pactUrls: [`${pactsOutDir}`] //Local .json Pact files must be retrieved from the broker OR generated through the Pact tests first
}).start()
