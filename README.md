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
Restauración de la Base de Datos
Para restaurar la base de datos desde el archivo de respaldo ubicado en la carpeta db, sigue estos pasos:

Abre tu cliente de MySQL.

Crea una nueva base de datos con el nombre newt si aún no existe:

CREATE DATABASE IF NOT EXISTS newt;

Importa el archivo de respaldo backupDB.sql ubicado en la carpeta db:

SOURCE "RUTA DEL BACKUP";

Instalación
Descarga el repositorio o clonalo

Accede al directorio del proyecto:

cd new-inntech

Instala las dependencias:

npm install

Una vez que el proyecto esté clonado y las dependencias estén instaladas, ejecuta el servidor con el siguiente comando:

docker compose up --build

Abre tu navegador web y ve a la siguiente URL para acceder al formulario de registro:

http://localhost:3001/registro

Completa el formulario de registro para crear un usuario.

Una vez registrado, podrás acceder al inicio.

Puedes cerrar sesión en cualquier momento y no podrás acceder al inicio hasta que inicies sesión nuevamente.

API
Puedes acceder a la API de usuarios utilizando la siguiente ruta:

http://localhost:3001/api/db/users

Y para la API de costumers:

http://localhost:3001/api/db/costumers