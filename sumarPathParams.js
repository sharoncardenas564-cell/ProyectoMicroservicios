const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3006;

const server = createServer((req, res) => {
    const partes = req.url.split('/');

    const dato1 = Number(partes[1]);
    const dato2 = Number(partes[2]);

    if (!Number.isFinite(dato1) || !Number.isFinite(dato2)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Datos inválidos' }));
        return;
    }

    const respuesta = { resultado: dato1 + dato2 };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(respuesta));
});

server.listen(port, hostname, () => {
    console.log(`Sumar Path Params en puerto ${port}`);
});
