import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { messageManager } from './managers/messageManager.js';

const app = express();
// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 8080;
// Configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

const httpServer = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

// Configuración de socket
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Nuevo usuario conectado con el id ${socket.id}`);
  
  socket.on("newUser", (data) => {
    socket.broadcast.emit("newUser", data);
  });
  socket.on("message", (data) => {
    const fechaActual = new Date();
    const horaMinutos = `${fechaActual.getHours().toString().padStart(2, '0')}:${fechaActual.getMinutes().toString().padStart(2, '0')}`;

    messageManager.messages.push({
      user: data.user,
      idUser: socket.id,
      message: data.message,
      fechaActual: fechaActual.toDateString(),
      horaMinutos: horaMinutos
    });
    messageManager.saveMessages(); 
    
    io.emit("messageLogs", messageManager.messages);
  });
});
