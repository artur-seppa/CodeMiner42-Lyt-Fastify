import { beforeEach, afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createServer } from '../../src/server.js';

describe('integration admin list urls', () => {
    let server;

    beforeAll(async () => {
        server = createServer();
        await server.ready();
    });

    afterAll(async () => {
        await server.close();
    });

    async function createShortUrl() {
        const originalUrl = 'https://www.pcdf.df.gov.br/servicos/delegacia-eletronica';

        const response = await server.inject({
            method: 'POST',
            url: '/',
            payload: { url: originalUrl }
        });

        const body = JSON.parse(response.body);
        const shortUrl = body.shortUrl;
        const shortCode = shortUrl.split('/').pop();

        return { shortCode: shortCode, originalUrl: originalUrl };
    }

    it.concurrent('should return the correct array of urls created', async () => {
        const { shortCode, originalUrl } = await createShortUrl();

        const response = await server.inject({
            method: 'GET',
            url: '/admin/urls'
        });

        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);
        const item = body.response[0];

        expect(item.shortCode).toBe(shortCode)
        expect(item.originalUrl).toBe(originalUrl)
        expect(item.visits).toBe(0)
    });

    it.concurrent('should return an empty value when not exists any url', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/admin/urls'
        });

        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);
        expect(body).toBeDefined();
        expect(body.response[0]).not.toBeDefined();
    });

    it.concurrent('should return an error when pass a invalid sortBy parameter', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/admin/urls?sortBy=blabla&order=asc'
        });

        expect(response.statusCode).toEqual(400);

        const body = JSON.parse(response.body);
        expect(body.message).toBe('Invalid sortBy parameter')
    });

    it.concurrent('should return an error when pass a invalid orderBy parameter', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/admin/urls?sortBy=views&order=blabla'
        });

        expect(response.statusCode).toEqual(400);

        const body = JSON.parse(response.body);
        expect(body.message).toBe('Invalid order parameter')
    });

});