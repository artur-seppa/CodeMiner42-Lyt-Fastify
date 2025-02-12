import Fastify from 'fastify';
import { routerPlugin } from './routes/index.js';

const fastify = Fastify({ logger: true });

function createServer() {
    try {
        const urlDatabase = {};

        fastify.decorate('urlDatabase', urlDatabase);
        fastify.register(routerPlugin);
        return fastify;
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

export { createServer };