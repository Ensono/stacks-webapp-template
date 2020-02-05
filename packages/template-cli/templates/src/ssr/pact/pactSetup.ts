import { Pact } from '@pact-foundation/pact';
import { resolve } from 'path';

const port = 8989;

export const provider = new Pact({
    port,
    log: resolve(process.cwd(), '__tests__', 'logs', 'mockserver-integration.log'),
    dir: resolve(process.cwd(), '__tests__', 'pacts'),
    spec: 2,
    cors: true,
    pactfileWriteMode: 'update',
    consumer: 'yumido-webapp',
    provider: 'menuapi',
});
