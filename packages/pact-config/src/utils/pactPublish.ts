#!/usr/bin/env node

import { Publisher } from '@pact-foundation/pact-node'
import { pactsOutDir } from '../index'

export const publisher = new Publisher({
    pactFilesOrDirs: [pactsOutDir],
    pactBroker: process.env.PACT_BROKER,
    pactBrokerToken: process.env.PACT_BEARER_TOKEN,
    consumerVersion: process.env.BUILD_NUMBER || 'unknown',
    tags: [process.env.SOURCE_BRANCH_NAME || 'local']
}).publish()
