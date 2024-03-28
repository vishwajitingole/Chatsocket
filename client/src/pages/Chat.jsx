import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("message", (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const socket = io("http://localhost:3000");
      socket.emit("message", inputMessage);
      setInputMessage("");
      inputRef.current.focus(); // Focus the input field after sending message
    }
  };

  return (
    <div>
      <div>
        {receivedMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        ref={inputRef} // Assign the ref to the input element
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
