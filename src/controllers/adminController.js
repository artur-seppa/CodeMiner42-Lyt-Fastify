import { listUrls } from '../service/listUrls.js';
import { deleteShortUrl } from '../service/deleteShortUrl.js';

export class AdminController {
    constructor(urlDatabase) {
        this.urlDatabase = urlDatabase;
    }

    async listUrls(request, reply) {
        try {
            const { sortBy, order } = request.query;
            const response = listUrls(sortBy, order, this.urlDatabase)

            if (response.status === 'error') {
                reply.status(400).send({
                    message: response.message
                });
            }

            return reply.status(200).send({
                response
            });
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }

    }

    async deleteUrl(request, reply) {
        try {
            const { shortCode } = request.params;
            const response = deleteShortUrl(shortCode, this.urlDatabase);

            if (response.status === 'error') {
                reply.status(404).send({
                    message: response.message
                });
            } else {
                return reply.status(200).send({
                    status: response.status,
                    message: response.message
                });
            }
        } catch (error) {
            return reply.status(500).send({
                error
            });
        }
    }

}