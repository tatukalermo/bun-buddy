import { Player } from "@/types";
import React from "react";

const PlayerInfo: React.FC<{ user: Player; isOpponent: boolean }> = ({
  user,
  isOpponent,
}) => {
  return (
    <div
      className={`flex gap-4 items-center w-9/12 bg-slate-300 text-slate-900 rounded border-4 p-2
${user.side === "player1" ? "border-white" : "border-black"}
 ${isOpponent ? "self-end flex-row-reverse text-right" : ""}`}
    >
      <div className="w-14 h-14 bg-white rounded-full"></div>
      <div className="flex flex-col">
        <span>{user.side}</span>
        <span className="text-lg font-bold">{user.username}</span>
      </div>
    </div>
  );
};

export default PlayerInfo;
