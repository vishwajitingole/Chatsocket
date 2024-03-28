import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import { useState } from "react";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  function log() {
    setIsLogin(true);
  }

  return (
    <div className="w-full h-screen bg-green-300">
      <Routes>
        {isLogin ? (
          <Route path="/" element={<Chat />} />
        ) : (
          <Route
            path="/"
            element={<Login login={log} />} // Pass the login prop here
          />
        )}
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
