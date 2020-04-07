import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';

const port = 8080;

export const provider = new Pact({
    port,
    log: resolve(process.cwd(), '__tests__', 'pact', 'logs', 'mockserver-integration.log'),
    dir: resolve(process.cwd(), '__tests__', 'pact', 'pacts'),
    spec: 2,
    cors: true,
    pactfileWriteMode: 'update',
    consumer: process.env.PACT_CONSUMER,
    provider: process.env.PACT_PROVIDER
});
