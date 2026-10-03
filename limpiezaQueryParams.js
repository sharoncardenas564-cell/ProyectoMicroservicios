const { createServer, request } = require('node:http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3003;

const serviceHost = process.env.SUMAR_QUERY_HOST;
const servicePort = process.env.SUMAR_QUERY_PORT;

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Use GET' }));
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const dato1 = url.searchParams.get('dato1');
    const dato2 = url.searchParams.get('dato2');

    const peticion = request({
        hostname: serviceHost,
        port: servicePort,
        path: `/?dato1=${encodeURIComponent(dato1 ?? '')}&dato2=${encodeURIComponent(dato2 ?? '')}`,
        method: 'GET'
    }, respuesta => {
        let resultado = '';

        respuesta.on('data', parte => resultado += parte);

        respuesta.on('end', () => {
            res.statusCode = respuesta.statusCode || 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(resultado);
        });
    });

    peticion.on('error', error => {
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'No se pudo contactar la lógica Query Params' }));
    });

    peticion.end();
});

server.listen(port, hostname, () => {
    console.log(`Limpieza Query Params en puerto ${port}`);
});
