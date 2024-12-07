GUIA DEL PROYECTO:

Desarrollar un sistema de chat:

# Proyecto de Comisión Backend

Este proyecto es una implementación de un servidor backend utilizando Node.js con Express, Socket.IO y Handlebars.

## Características principales

- Servidor web con Express
- Comunicación en tiempo real con Socket.IO
- Renderizado de vistas con Handlebars
- Gestión de mensajes en tiempo real

## Configuración

Este proyecto está configurado para:

- Escuchar en el puerto 8080 (`process.env.PORT` o `8080`)
- Usar Handlebars como motor de vistas (`app.engine("handlebars", handlebars.engine());`)
- Renderizar la página principal en `/` (`app.get("/", (req, res) => { ... });`)
- Manejar conexiones Socket.IO (`io.on("connection", (socket) => { ... });`)
- Almacenar mensajes en JSON (`messageManager.path = "./src/managers/data/messages.json";`)

## Uso

1. Abre una terminal y ejecuta `node app.js` para iniciar el servidor.
2. Abre un navegador y ve a `http://localhost:8080` para ver la interfaz web.
3. Para probar la comunicación en tiempo real:
   - Abre varias pestañas del navegador.
   - Cada pestaña representa un usuario conectado.
   - Envía mensajes desde diferentes pestañas para ver cómo se sincronizan entre todos los usuarios.

## Funcionalidades

### Mensajería en tiempo real
- Los usuarios pueden enviar mensajes a todos los conectados o solo a un destinatario específico.
- Los mensajes se actualizan instantáneamente para todos los usuarios conectados.

### Gestión de usuarios
- Cada usuario tiene un ID único (`socket.id`).
- El servidor emite eventos `newUser` cuando un nuevo usuario se conecta.

### Persistencia de datos
- Los mensajes se almacenan permanentemente en archivos JSON.
- Se implementa una función `saveMessages()` que es llamada después de cada mensaje enviado.

## Desarrollo

Este proyecto utiliza las siguientes tecnologías:

- **Node.js**: Versión 22.11.0
- **Express**: Para crear el servidor web
- **Socket.IO**: Para la comunicación en tiempo real
- **Handlebars**: Como motor de vistas
- **fs**: Para manejar archivos y persistencia de datos