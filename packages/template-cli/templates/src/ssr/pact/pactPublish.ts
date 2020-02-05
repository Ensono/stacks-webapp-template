import { Publisher } from '@pact-foundation/pact-node'
import { provider } from '../pact/pactSetup'

export const publisher = new Publisher({
    pactFilesOrDirs: [provider.opts.dir],
    pactBroker: process.env['Test.PactBroker'] || process.env.PACT_BROKER,
    pactBrokerToken: process.env['Test.PactBearerToken'] || process.env.PACT_BEARER_TOKEN,
    consumerVersion: process.env.BUILD_NUMBER || 'unknown'
})

publisher.publish()
