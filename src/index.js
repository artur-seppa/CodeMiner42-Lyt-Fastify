import { createServer } from './server.js';

async function startServer() {
    const server = await createServer();
    await server.listen({ port: 3000 });
};

startServer();