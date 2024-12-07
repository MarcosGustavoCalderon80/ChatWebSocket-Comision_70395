// Configuramos el socket del lado del cliente
const socket = io();

let user;
let chatBox = document.getElementById("chatBox");

// Alerta para ingresar datos
Swal.fire({
  title: "Nombre de usuario",
  input: "text",
  text: "Ingrese un nombre para identificarte",
  inputValidator: (value) => {
    return !value && "Por favor debe ingresar el nombre de un usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;

  // Enviamos el usuario al servidor
  socket.emit("newUser", user);
});

function sendMessage() {
    if (chatBox.value.trim().length > 0) {
        socket.emit("message", { user: user, message: chatBox.value });
        chatBox.value = "";
    }
}
//Agregamos el evento para enviar el mensaje con la tecla "Enter"
chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendMessage();
}});

// Agregamos el evento onclick al botón
document.querySelector("#chatBox ~ button").onclick = () => {
    sendMessage();
};

// Recibimos los mensajes del chat actualizados
socket.on('messageLogs', (data) => {
  let messagesLogs = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((messageLog) => {
    messages = messages + `<div class= 'nameUser'> ${messageLog.user} dice: ${messageLog.message} </br> ${messageLog.horaMinutos} </div></br>`
  });

  messagesLogs.innerHTML = messages;
});

//Aviso de conexion de nuevo usuario
socket.on("newUser", (data) => {
  Swal.fire({
    text: `Se conectó ${data}`,
    toast: true,
    position: "top-right",
    timer: 4000
  })
})

