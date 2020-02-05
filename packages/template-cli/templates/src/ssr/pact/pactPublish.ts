import { Publisher } from '@pact-foundation/pact-node'
import { provider } from '../pact/pactSetup'

export const publisher = new Publisher({
    pactFilesOrDirs: [provider.opts.dir],
    pactBroker: 'https://amido-stacks.pact.dius.com.au',
    pactBrokerToken: process.env['Test.PactBearerToken'] || process.env.PACT_BEARER_TOKEN,
    consumerVersion: process.env.BUILD_NUMBER || 'unknown'
})

publisher.publish()
