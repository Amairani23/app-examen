# Backend - Sistema de Evaluación
### Descripción

API REST desarrollada con Node.js y Express para gestionar la autenticación de usuarios, consultar exámenes, recibir respuestas y almacenar los resultados de las evaluaciones.

### Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Requisitos
- Node.js 20 LTS o compatible.
- npm.
- MongoDB local o MongoDB Atlas.

### Instalación

##### Instalar las dependencias:
`npm install`

##### Configuración
Crear un archivo .env en la raíz del backend:
env
`MONGO_URI=mongodb://localhost:27017/examenes`
`JWT_SECRET=tu_clave_secreta`

##### Ejecutar el servidor
`npm run start`

### Base de datos

Se utiliza MongoDB para almacenar:
- Usuarios.
- Exámenes.
- Preguntas.
- Intentos y resultados de los estudiantes.

La conexión con MongoDB se realiza mediante Mongoose.

##### Endpoints de la API

Documentar aquí las rutas del proyecto.

Método	Endpoint	Controlador	Descripción
- POST	/exam - createExam: Crear y registrar un nuevo examen.
- GET	/exam- showExam: Consultar y mostrar los exámenes disponibles.
- GET	/attempts/:examId - checkExamAttempt: Consultar si el estudiante ya presentó el examen.
- POST	/attempts/:examId - submitExam: Recibir las respuestas, calificar el examen y registrar los resultados.
- GET	/users/me - getCurrentUser: Obtener la información del usuario autenticado.

Nota: ajustar las rutas según los endpoints implementados.

### Autenticación

Se utiliza JWT para gestionar la autenticación y proteger las rutas que requieren acceso autorizado.

### Funcionamiento
- Recibe las solicitudes del frontend.
- Valida las credenciales de los usuarios.
- Consulta los exámenes almacenados.
- Procesa las respuestas enviadas.
- Calcula los aciertos y errores.
- Guarda los resultados en MongoDB.
- Devuelve la información necesaria para mostrar la retroalimentación.

### Flujo de comunicación
-  El estudiante inicia sesión.
-     El frontend consulta los datos del usuario autenticado mediante /users/me.
-     Se consultan los exámenes disponibles mediante /exam.
-     Se verifica si el estudiante ya presentó el examen mediante /attempts/:examId.
-     Si no existe un intento completado, el estudiante puede responder el examen.
-     Se envían las respuestas mediante POST /attempts/:examId.
-     El backend califica y almacena los resultados.
-     El frontend muestra la retroalimentación correspondiente.

#### Mejoras futuras y posibles optimizaciones

Aunque el backend cuenta con las funcionalidades principales para gestionar usuarios, exámenes y resultados, existen algunas mejoras que podrían implementarse para fortalecer su seguridad, organización y rendimiento.

Como:
-     Implementar un sistema de roles y permisos para diferenciar estudiantes y administradores.
-     Mejorar la gestión de tokens JWT mediante expiración y renovación.
-     Fortalecer las validaciones de autenticación y autorización en los endpoints.
-     Configurar CORS para permitir únicamente solicitudes desde los dominios autorizados.



