import { Stub } from '@pact-foundation/pact-node'
import { provider } from './pactSetup'

const port = 8389

export const server = new Stub({
    port: port,
    pactUrls: [`${provider.opts.dir}`] //Local .json Pact files must be retrieved from the broker OR generated through the Pact tests first
}).start();