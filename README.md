# New Inntech

Prueba tecnica
Crear un api rest con express la cual permita realizar CRUD de usuarios y login con autenticación jwt.

NOTA: El proyecto se debe ejecutar sobre un contenedor de docker.

Criterios de aceptación:

- Se debe crear un repositorio público en Github en donde se va a cargar el código de la prueba.
- El repositorio debe contener el backup de la base de datos y colección postman utilizada en el desarrollo
- Los registros deben quedar almacenados en base de datos mysql.
- Se debe generar un archivo readme con los detalles de la ejecución del api.
- La documentación en swagger (opcional)

Instalación
Clona este repositorio:


git clone https://github.com/tu_usuario/new-inntech.git

Accede al directorio del proyecto:

cd new-inntech

Instala las dependencias:

npm install

(Opcional) Si estás utilizando Docker, puedes construir y ejecutar el contenedor Docker:

docker build -t new-inntech .
docker run -p 3001:3001 new-inntech
Uso
Una vez que el proyecto esté clonado y las dependencias estén instaladas, ejecuta el servidor con el siguiente comando:

docker compose up --build

Abre tu navegador web y ve a la siguiente URL para acceder al formulario de registro:

bash
Copy code
http://localhost:3001/registro

Completa el formulario de registro para crear un usuario.

Una vez registrado, podrás acceder al inicio.

Puedes cerrar sesión en cualquier momento y no podrás acceder al inicio hasta que inicies sesión nuevamente.

API
Puedes acceder a la API de usuarios utilizando la siguiente ruta:

http://localhost:3001/api/db/users

Y para la API de costumers:

http://localhost:3001/api/db/costumers