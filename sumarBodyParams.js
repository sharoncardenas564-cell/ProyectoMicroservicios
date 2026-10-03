const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3002;

const server = createServer((req, res) => {
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
            const dato1 = Number(datos.dato1);
            const dato2 = Number(datos.dato2);

            if (!Number.isFinite(dato1) || !Number.isFinite(dato2)) {
                throw new Error('Datos no numéricos');
            }

            const respuesta = { resultado: dato1 + dato2 };

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(respuesta));
        } catch (error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Datos inválidos' }));
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Sumar Body Params en puerto ${port}`);
});
