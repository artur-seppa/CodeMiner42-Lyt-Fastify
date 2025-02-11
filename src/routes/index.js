// async function routes(fastify, options) {
//     fastify.get('/', async (request, reply) => {
//         return {
//             status: 'ok',
//             message: 'Servidor Fastify rodando!'
//         };
//     });
// }

// module.exports = routes;

export function routerPlugin(fastify, options, done) {
    fastify.get('/', async (request, reply) => {
        reply.code(200).send({
            status: 'ok',
            message: 'Server is running'
        });
    });

    done();
}
