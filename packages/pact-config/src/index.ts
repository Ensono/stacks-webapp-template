import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';
import { PactfileWriteMode } from '@pact-foundation/pact/src/dsl/mockService';

const options = (mockPort?: number) => ({
    port: mockPort,
    log: resolve(process.cwd(), 'pact', 'logs', 'mockserver-integration.log'),
    dir: resolve(process.cwd(), 'pact', 'pacts'),
    spec: 2,
    cors: true,
    pactfileWriteMode: 'update' as PactfileWriteMode,
    //Really important to get these names correct as they are the ID, must be exact
    consumer: process.env.PACT_CONSUMER || "", //Dictated from Provider
    provider: process.env.PACT_PROVIDER || "" //Dictated from Provider
});

export const pactSetup = (port?: number) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // This is to give the pact mock server time to start

    const provider = new Pact(options(port))

    beforeAll(() => provider.setup()); // Create mock provider
    afterAll(() => provider.finalize()); // Tear down the mock and write the pact

    return provider
}

export const pactsOutDir = options().dir
