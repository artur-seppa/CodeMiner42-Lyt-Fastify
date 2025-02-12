import { UrlController } from '../controllers/urlController.js';

export function routerPlugin(fastify, options, done) {
    const urlDatabase = fastify.urlDatabase;
    const urlController = new UrlController(urlDatabase);

    fastify.post('/', async (request, reply) => {
        return urlController.createShortUrl(request, reply);
    });

    fastify.get('/:shortCode', async (request, reply) => {
        return urlController.redirect(request, reply);
    });

    fastify.get('/:shortCode/visits', async (request, reply) => {
        return urlController.visitsCounter(request, reply);
    });

    done();
}
