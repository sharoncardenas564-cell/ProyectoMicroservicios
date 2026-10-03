# Microservicios de suma - Body, Query y Path Params

Proyecto académico con arquitectura de tres capas:

1. Front-End
2. Microservicio de limpieza
3. Lógica de negocio

## Microservicios

### Body Params
Front → suma-limpieza-body → suma-body

### Query Params
Front → suma-limpieza-query → suma-query

### Path Params
Front → suma-limpieza-path → suma-path

## Despliegue

El archivo `render.yaml` está preparado para crear los seis microservicios Node.js y un sitio estático para el Front-End en Render.

Después del despliegue, se deben copiar las URL públicas de:
- suma-limpieza-body
- suma-limpieza-query
- suma-limpieza-path

y reemplazar en `calculadora.html`:

- REEMPLAZAR-LIMPIEZA-BODY
- REEMPLAZAR-LIMPIEZA-QUERY
- REEMPLAZAR-LIMPIEZA-PATH

El Front-End usa esas tres URLs porque son los servicios que reciben las peticiones desde el navegador.

## Prueba

Ejemplo:

Dato1 = 10
Dato2 = 20

Body → resultado 30
Query → resultado 30
Path → resultado 30

## GitHub

Subir todos los archivos del proyecto a un repositorio de GitHub.

## Entrega

- Carpeta comprimida en ZIP
- PDF con capturas de funcionamiento
- Enlace al repositorio de GitHub
