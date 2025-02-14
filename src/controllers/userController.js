import { createShortUrl } from '../service/createShortUrl.js';
import { redirectToOriginalUrl } from '../service/redirectToOriginalUrl.js';
import { redirectToVisitsCounter } from '../service/redirectToVisitsCounter.js';

export class UserController {
    constructor(urlDatabase) {
        this.urlDatabase = urlDatabase;
    }

    async createShortUrl(request, reply) {
        try {
            const { url: originalUrl } = request.body;
            const response = createShortUrl(originalUrl, this.urlDatabase);

            if (response.status === 'error') {
                reply.status(400).send({
                    response: response.message
                });
            }

            return reply.status(201).send({
                shortUrl: response.shortUrl,
                originalUrl: response.originalUrl
            });
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }

    }

    async redirect(request, reply) {
        try {
            const { shortCode } = request.params;
            const response = redirectToOriginalUrl(shortCode, this.urlDatabase);

            if (response.status === 'error') {
                reply.status(404).send({
                    response: response.message
                });
            } else {
                reply
                    .status(301)
                    .redirect(response.redirect);
            }
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }

    }

    async visitsCounter(request, reply) {
        try {
            const { shortCode } = request.params;
            const response = redirectToVisitsCounter(shortCode, this.urlDatabase);

            if (response.status === 'error') {
                reply.status(404).send({
                    response: response.message
                });
            } else {
                return reply.status(200).send({ visits: response.visits });
            }
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }

    }

}