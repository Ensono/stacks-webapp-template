import { Publisher } from '@pact-foundation/pact-node'
import { provider } from './pactSetup'

export const publisher = new Publisher({
    pactFilesOrDirs: [provider.opts.dir],
    pactBroker: process.env.PACT_BROKER,
    pactBrokerToken: process.env.PACT_BEARER_TOKEN,
    consumerVersion: process.env.BUILD_NUMBER || 'unknown',
    tags: [process.env.SOURCE_BRANCH_NAME || 'local']
})

publisher.publish()
