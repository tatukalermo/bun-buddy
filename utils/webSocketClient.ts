import { Unit } from "@/types";

const socket = new WebSocket("ws://localhost:8080/");

const webSocketEventCallback = (event: MessageEvent) => {

  const wsClient = JSON.parse(event.data);
  console.log(wsClient);
  switch (wsClient.type) {
    case "USERS_SET":
      console.log(
        "new user added! ",
        wsClient.data.find((user: { username: string }) => !!user.username)
          .username
      );
      break;
    case "MESSAGES_SET":
      console.log("lobby messages: ", wsClient.data);
      break;
      break;
    case "MESSAGES_ADD":
      console.log("newMessage: ", wsClient.data);
      break;
    case "GAMESTATE_ADD":
      console.log("piece placed", wsClient.data);
      break;
  }
};

export function listenWebSocketMessageEvents() {
  socket.addEventListener("message", webSocketEventCallback);
}

export function removeWebSocketMessageEvents() {
  socket.removeEventListener("message", webSocketEventCallback);
}

export function addMessage(text: string) {
  socket.send(JSON.stringify({ text: text, type: "MESSAGES_ADD" }));
}

export function addUnit(gameState: Unit) {
  socket.send(JSON.stringify({ gameState: gameState, type: "GAMESTATE_ADD" }));
}
