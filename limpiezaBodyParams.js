```js
const http = require("http");

const PORT = process.env.PORT || 3001;

const servidor = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === "/body" && req.method === "POST") {

        let body = "";

        req.on("data", (parte) => {
            body += parte;
        });

        req.on("end", () => {

            try {

                const datos = JSON.parse(body);

                const dato1 = Number(datos.dato1);
                const dato2 = Number(datos.dato2);

                const datosLimpios = JSON.stringify({
                    dato1: dato1,
                    dato2: dato2
                });

                const opciones = {
                    hostname: "suma-body-0j3x.onrender.com",
                    port: 443,
                    path: "/sumar",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": Buffer.byteLength(datosLimpios)
                    }
                };

                const peticion = require("https").request(opciones, (respuesta) => {

                    let respuestaBody = "";

                    respuesta.on("data", (parte) => {
                        respuestaBody += parte;
                    });

                    respuesta.on("end", () => {

                        res.writeHead(respuesta.statusCode || 200, {
                            "Content-Type": "application/json"
                        });

                        res.end(respuestaBody);
                    });
                });

                peticion.on("error", (error) => {

                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        error: "No se pudo conectar con suma-body",
                        detalle: error.message
                    }));
                });

                peticion.write(datosLimpios);
                peticion.end();

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    error: "Los datos enviados no son válidos"
                }));
            }
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        mensaje: "Ruta no encontrada"
    }));
});

servidor.listen(PORT, "0.0.0.0", () => {
    console.log(`Limpieza Body Params en puerto ${PORT}`);
});
```
