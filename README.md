# Pasarela de Pago

Este proyecto permite tokenizar datos de tarjeta y recuperar la información de la tarjeta mediante un token. 

## Requisitos

- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).
- Instancia de [PostgreSQL](https://www.postgresql.org/download/) en ejecución y configurada.
- Instancia de [Redis](https://redis.io/download) en ejecución y configurada.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

````npm install````

## Configuración de la Base de Datos

Para crear las tablas y estructuras necesarias en PostgreSQL:

Conéctate a tu instancia PostgreSQL.
Ejecuta el script SQL que se encuentra en el archivo db/script.sql.

````psql -U <usuario> -d <bd> -a -f script.sql````

Reemplaza <usuario> y <bd> con tus datos de PostgreSQL

## Ejecución del Proyecto

Para correr el proyecto localmente:

````serverless offline````

## Pruebas
Para ejecutar las pruebas unitarias:

````npm test````

## Documentación

### Crear un Token

Método: POST
URL: http://localhost:3000/createToken
Headers: Content-Type: application/json
Body:

```json
{
"cardNumber": "4111111111111111",
"cvv": "123",
"expirationMonth": 12,
"expirationYear": 2025,
"email": "usuario@gmail.com"
}
```


### Obtener Información de la Tarjeta

Método: GET
URL: http://localhost:3000/fetchCard/{token}
Headers: Content-Type: application/json

