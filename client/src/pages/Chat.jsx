import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Message = ({ sender, text }) => (
  <motion.div
    className={`p-2 m-2 flex max-w-xs ${
      sender === "me"
        ? "bg-blue-500 text-white self-start ml-[-10vw]"
        : "bg-gray-300 self-start mr-[-20vw]"
    } rounded-md`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
  >
    <p>{sender === "me" ? "Me: " : "Other: "}</p>
    <p>{text}</p>
  </motion.div>
);

const App = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3000");

    newSocket.onopen = () => {
      console.log("Connected to server");
    };

    newSocket.onmessage = (event) => {
      const reader = new FileReader();
      reader.onload = function () {
        const receivedMessage = reader.result;
        console.log("Received message:", receivedMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "other", message: receivedMessage },
        ]);
      };
      reader.readAsText(event.data);
    };

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    socket.send(inputMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "me", message: inputMessage },
    ]);
    setInputMessage("");
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.message} />
        ))}
      </div>
      <div className="bottom-0 flex items-center justify-center mt-4 ">
        <input
          type="text"
          className="px-2 py-1 mr-2 border rounded"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message"
        />

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.93 }}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={sendMessage}
        >
          Send
        </motion.button>
        <div className="absolute top-0  w-full h-[100vh]  z-[-10]">
          <img
            className="object-contain w-full h-full "
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzEyfHxiYWNrZ3JvdW5kJTIwY2hhdHxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default App;
