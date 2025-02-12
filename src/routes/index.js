import { userRoute } from './userRoute.js';
import { adminRoute } from './adminRoute.js';

export function routerPlugin(fastify, options, done) {
    fastify.register(userRoute, { prefix: '/' });
    fastify.register(adminRoute, { prefix: '/admin' });

    done();
}