# Frontend - Sistema de Evaluación
### Descripción

Interfaz web desarrollada con React y TypeScript para realizar evaluaciones en línea. Permite iniciar sesión, responder exámenes y consultar la retroalimentación obtenida.

### Tecnologías utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Prettier

### Requisitos
- Node.js 20 LTS o compatible.
- npm.
- Backend en funcionamiento.

### Instalación

##### Instalar las dependencias:
`npm install`

##### Configuración
Crear un archivo .env en la raíz del frontend:
env
VITE_API_URL=http://localhost:3000/api

##### Ejecutar el proyecto
`npm run dev`


##### Abrir la dirección proporcionada por Vite, normalmente:
`http://localhost:5173`

------------


### Funcionalidades
- Inicio de sesión.
- Protección de rutas mediante React Router.
- Consulta de preguntas desde el backend.
- Selección de respuestas.
- Validación de preguntas contestadas.
- Envío de evaluaciones.
- Visualización de calificaciones.
- Retroalimentación de respuestas correctas e incorrectas.
- Ventanas emergentes reutilizables.

### Arquitectura
- components/: componentes y páginas de la aplicación.
- hooks/: hooks personalizados para autenticación y ventanas emergentes.
- modal/: componentes de ventanas emergentes.
- utils/: datos JSON de prueba, utilidades, y comunicación con el backend (ajustar a la ubicación real).
- Datos de prueba

##### Los archivos JSON de ejemplo se encuentran en:
src/utils/
├── examen.exams.json
└── examen.users.json

### Navegación

Se utiliza React Router DOM para administrar las siguientes rutas:
- /: inicio de sesión.
- /examen: realización del examen.
- /retroalimentacion: consulta de resultados.

Las rutas protegidas verifican que el usuario tenga acceso antes de mostrar el contenido.

### Flujo general de funcionamiento
- El usuario inicia sesión.
- Accede al apartado de exámenes.
- Se cargan las preguntas almacenadas en MongoDB mediante la API.
- El usuario selecciona una respuesta para cada pregunta.
- El sistema valida que todas las preguntas hayan sido contestadas.
- Se envían las respuestas al backend.
- El backend procesa y evalúa las respuestas.
- El usuario es redirigido a la sección de retroalimentación.
- Se muestran los aciertos, errores, calificación y respuestas correctas.

### Mejoras futuras
- Panel administrativo.
- Historial de evaluaciones.
- Estadísticas de rendimiento.
- Exportación de resultados.
- Pruebas automatizadas.


