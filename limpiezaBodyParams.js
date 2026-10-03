const { createServer, request } = require('node:http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3001;

const serviceHost = process.env.SUMAR_BODY_HOST;
const servicePort = process.env.SUMAR_BODY_PORT;

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Use POST' }));
        return;
    }

    let body = '';

    req.on('data', parte => {
        body += parte;
    });

    req.on('end', () => {
        try {
            const datos = JSON.parse(body);
            const dato1 = datos.dato1;
            const dato2 = datos.dato2;

            const peticion = request({
                hostname: serviceHost,
                port: servicePort,
                path: '/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
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
                res.end(JSON.stringify({ error: 'No se pudo contactar la lógica Body Params' }));
            });

            peticion.write(JSON.stringify({ dato1, dato2 }));
            peticion.end();

        } catch (error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Body inválido' }));
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Limpieza Body Params en puerto ${port}`);
});
