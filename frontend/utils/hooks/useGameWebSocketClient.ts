import { useGameState } from "@/store/useGameState";
import { Unit } from "@/types";
import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const socketURL = "ws://localhost:8080/";

const useGameWebSocketClient = () => {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL);
  const { placeNewUnit } = useGameState();

  useEffect(() => {
    if (lastMessage !== null) {
      const msg = JSON.parse(lastMessage.data);
      const { data } = msg;

      switch (msg.type) {
        case "GAMESTATE_ADD":
          placeNewUnit(data);
          setMessageHistory((prev) => [
            ...prev,
            `Opponent placed a ${data.unitType} unit on X${data.location.x} Y${data.location.y}`,
          ]);
          break;
        case "GAMESTATE_SET":
          const unitSet = data[data.length - 1];
          placeNewUnit(unitSet);
          setMessageHistory((prev) => [
            ...prev,
            `I placed a ${unitSet.unitType} unit on X${unitSet.location.x} Y${unitSet.location.y}`,
          ]);
          break;
        case "USERS_ADD":
          setMessageHistory((prev) => [
            ...prev,
            `user ${data.username} entered the game`,
          ]);
          break;
      }
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    (unit: Unit) => sendMessage(JSON.stringify({ gameState: unit })),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return { connectionStatus, messageHistory, handleClickSendMessage };
};

export default useGameWebSocketClient;
