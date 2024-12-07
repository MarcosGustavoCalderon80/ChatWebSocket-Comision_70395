import fs from "fs";

export class MessageManager {
  constructor() {
    this.messages = [];
    this.path = "./src/managers/data/messages.json";
    
    // Lee los datos al inicializar
    this.loadMessages();
  }

  async loadMessages() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      this.messages = JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
    }
  }

  async saveMessages() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.messages, null, 2));
  }
}
export const messageManager = new MessageManager();

