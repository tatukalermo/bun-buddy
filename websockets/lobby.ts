import type { Player, Unit } from "@/types";

const users: Player[] = [];
const serverGameState: Unit[] = [];

Bun.serve<Player>({
  port: 8080,
  fetch(req, server) {
    const success = server.upgrade(req, {
      // Set username
      data: {
        username: "käyttäjä_" + Math.random().toString(16).slice(12),
      },
    });

    // if http upgrade to websocket is successful
    return success
      ? undefined
      : new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: {
    // New Client connects to the websockets
    open(ws) {
      const newUser: Player = {
        username: ws.data.username,
        side: users.length === 0 ? "player1" : "player2",
      };
      users.push(newUser);

      // Subscribe to pub/sub channel to send/receive broadcast messages,
      // without this the socket could not esnd event to other clients
      ws.subscribe("lobby");

      // Broadcast that a user joined
      // On the client side we can parse various messages by the type property
      ws.publish("lobby", JSON.stringify({ type: "USERS_ADD", data: newUser }));

      ws.send(JSON.stringify({ type: "USERS_SET", data: users }));
    },
    // Client sends a message
    message(ws, msg: string) {
      // Data sent is a string, parse to object
      const { gameState } = JSON.parse(msg);

      ws.publish(
        "lobby",
        JSON.stringify({ type: "GAMESTATE_ADD", data: gameState })
      );

      serverGameState.push(gameState);
      ws.send(JSON.stringify({ type: "GAMESTATE_SET", data: serverGameState }));
    },
    // a client disconnects from the server
    close(ws) {
      users.filter((user) => user.username !== ws.data.username);

      ws.publish(
        "lobby",
        JSON.stringify({ type: "USERS_REMOVE", data: ws.data.username })
      );
    },
  },
});
