import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(`ws://localhost:3000`);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    setSocket(socket); // Save the socket instance in state

    return () => {
      socket.disconnect(); // Disconnect from the Socket.IO server when the component unmounts
    };
  }, []);

  const sendMessage = () => {
    console.log(socket);
    if (socket && inputMessage.trim() !== "") {
      socket.emit("message", inputMessage);
      setInputMessage("");
    } else {
      console.error("Socket is not initialized or input message is empty");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-blue-500 text-white text-center">
        <h1 className="text-xl font-bold">Real-time Chat</h1>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            <div className="bg-white p-2 rounded shadow">
              <p className="text-gray-800">{message}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
