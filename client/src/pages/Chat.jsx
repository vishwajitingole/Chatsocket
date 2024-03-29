import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

function Chat() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const socket = io("https://chatsocket-7.onrender.com/");

    //Listener
    socket.on("message", (message) => {
      setReceivedMessages((prevMessages) => [...prevMessages, message]);
    });

    //Ye part tab chalega jab hum  pageko close karte tab
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const socket = io("http://localhost:3000");
      //Event
      socket.emit("message", inputMessage);
      setInputMessage("");
      inputRef.current.focus(); //Submmit ke baad aksar cursor focus humara input se nikal jta toh ye set kardega
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
        ref={inputRef}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
