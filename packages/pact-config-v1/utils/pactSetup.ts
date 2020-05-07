import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';

const port = 3054;

export const provider = new Pact({
    port,
    log: resolve(process.cwd(), '__tests__', 'pact', 'logs', 'mockserver-integration.log'),
    dir: resolve(process.cwd(), '__tests__', 'pact', 'pacts'),
    spec: 2,
    cors: true,
    pactfileWriteMode: 'update',
    //Really important to get these names correct as they are the ID, must be exact
    consumer: process.env.PACT_CONSUMER || "", //Dictated from Provider
    provider: process.env.PACT_PROVIDER || "" //Dictated from Provider
});
