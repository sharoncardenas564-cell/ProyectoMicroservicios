const { createServer, request } = require('node:http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3005;

const serviceHost = process.env.SUMAR_PATH_HOST;
const servicePort = process.env.SUMAR_PATH_PORT;

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Use GET' }));
        return;
    }

    const partes = req.url.split('/');

    const dato1 = partes[1];
    const dato2 = partes[2];

    if (dato1 === undefined || dato2 === undefined) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Faltan Path Params' }));
        return;
    }

    const peticion = request({
        hostname: serviceHost,
        port: servicePort,
        path: `/${encodeURIComponent(dato1)}/${encodeURIComponent(dato2)}`,
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
        res.end(JSON.stringify({ error: 'No se pudo contactar la lógica Path Params' }));
    });

    peticion.end();
});

server.listen(port, hostname, () => {
    console.log(`Limpieza Path Params en puerto ${port}`);
});
