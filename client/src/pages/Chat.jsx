import React, { useEffect } from "react";
import { io } from "socket.io-client";

function Chat() {
  useEffect(() => {
    const socket = io("localhost:3000");
    socket.on("hello", (arg) => {
      console.log(arg);
    });
  }, []);
  return <div>Chat</div>;
}

export default Chat;
