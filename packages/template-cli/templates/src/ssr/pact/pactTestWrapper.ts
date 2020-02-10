import { provider } from './pactSetup';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // This is to give the pact mock server time to start

beforeAll(() => provider.setup()); // Create mock provider
afterAll(() => provider.finalize()); // Tear down the mock and write the pact
