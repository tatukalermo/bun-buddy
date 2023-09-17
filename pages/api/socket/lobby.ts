let users: { username: string }[] = [];
const messages: { username: string; message: string }[] = [];

interface ClientWebSocketData {
  username: string;
}

Bun.serve<ClientWebSocketData>({
  port: 8080,
  fetch(req, server) {
    const success = server.upgrade(req, {
      // Set username
      data: {
        username: "käyttäjä_" + Math.random().toString(16).slice(12),
      },
    });

    return success
      ? undefined
      : new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: {
    // New Client connects to the websockets
    open(ws) {
      const newUsername = { username: ws.data.username };
      users.push(newUsername);

      // Subscribe to pub/sub channel to send/receive broadcast messages,
      // without this the socket could not esnd event to other clients
      ws.subscribe("chat");

      // Broadcast that a user joined
      // On the client side we can parse various messages by the type property
      ws.publish(
        "chat",
        JSON.stringify({ type: "USERS_ADD", data: newUsername })
      );

      ws.send(JSON.stringify({ type: "USERS_SET", data: users }));
      ws.send(JSON.stringify({ type: "MESSAGES_SET", data: messages }));
    },
    // Client sends a message
    message(ws, msg) {
      // Data sent is a string, parse to object
      const newMessage = JSON.parse(msg);
      newMessage.username = ws.data.username;
      messages.push(newMessage);

      // Send message to all clients subscribed to the chat channel
      ws.publish(
        "chat",
        JSON.stringify({ type: "MESSAGES_ADD", data: newMessage })
      );
    },
    // a client disconnects from the server
    close(ws) {
      users = users.filter((user) => user.username !== ws.data.username);

      ws.publish(
        "chat",
        JSON.stringify({ type: "USERS_REMOVE", data: ws.data.username })
      );
    },
  },
});
