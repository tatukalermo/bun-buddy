import { Unit } from "@/types";

export const socket = new WebSocket("ws://localhost:8080/");

export function addUnit(gameState: Unit) {
  socket.send(JSON.stringify({ gameState: gameState}));
}
