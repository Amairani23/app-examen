# Sistema de Evaluación de Exámenes
### Descripción

Aplicación web para realizar evaluaciones en línea. Permite a los estudiantes iniciar sesión, responder preguntas, enviar sus respuestas y consultar sus resultados mediante una sección de retroalimentación.

### Tecnologías utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Node.js
- Express
- MongoDB
- Mongoose
- JWT

### Estructura del proyecto
text
app-exam/
├── frontend/
│   └── README.md
│
├── backend/
│   └── README.md
│
└── README.md

### Documentación
- Documentación del Frontend
- Documentación del Backend

### Instalación

Consulta los README de cada módulo para conocer sus requisitos, variables de entorno, instalación y comandos de ejecución.

### Base de datos

Se utiliza MongoDB para almacenar usuarios, exámenes, preguntas y resultados.

## Los documentos JSON de prueba se encuentran en:

text
frontend/src/utils/
├── examen.exams.json
└── examen.users.json

### Dudas, supuestos y funcionalidades fuera del alcance
Dudas y decisiones tomadas
- Se consideró que cada pregunta tiene un identificador único para relacionarla con la respuesta correspondiente.
- Se asumió que el backend es responsable de evaluar las respuestas y calcular la calificación.
- Se utilizó el estado de navegación de React Router para transportar los resultados y las preguntas hacia la pantalla de retroalimentación.
- Se consideró que un usuario debe responder todas las preguntas antes de enviar el examen.
- Se implementaron rutas protegidas para evitar el acceso a las evaluaciones sin iniciar sesión.
- Funcionalidades fuera del alcance
- Panel administrativo para gestionar usuarios y exámenes.
- Generación automática de preguntas.
- Estadísticas avanzadas de rendimiento.
- Exportación de resultados a PDF o Excel.
- Sistema de recuperación de contraseña.

### ¿Qué haría con más tiempo?

Si se dispusiera de más tiempo, se podrían implementar las siguientes mejoras:
- Crear un panel administrativo para agregar, editar y eliminar preguntas y exámenes.
- Incorporar temporizadores para establecer un límite de tiempo por evaluación.
- Mejorar el sistema de autenticación y administración de sesiones.
- Implementar un historial de exámenes realizados por cada usuario.
- Agregar estadísticas para visualizar el rendimiento de los estudiantes.
- Mejorar la experiencia de usuario mediante notificaciones y mensajes de validación.
- Implementar pruebas unitarias y de integración.
- Mejorar el diseño responsive para dispositivos móviles.
- Persistir los intentos y resultados para que puedan consultarse aunque el usuario actualice la página.

### Conclusión

El proyecto permitió desarrollar una aplicación web de evaluación que integra autenticación, navegación protegida, consumo de una API, almacenamiento de información y evaluación automática.

Se buscó mantener una estructura modular mediante componentes reutilizables y hooks personalizados, facilitando la organización, mantenimiento y futuras mejoras del sistema.