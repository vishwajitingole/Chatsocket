import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let username = emailRef.current.value;
    let password = passwordRef.current.value;

    try {
      await axios
        .post("http://localhost:3000/api/v1/signup", {
          username,
          password,
        })
        .then(() => {
          emailRef.current.value = "";
          passwordRef.current.value = "";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="h-screen w-full flex justify-center items-center bg-[#B8CAF0]"
      style={{
        backgroundImage:
          'url("https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9naW58ZW58MHx8MHx8fDA%3D")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "right",
      }}
    >
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-7 bg-[#DDB584] p-10 rounded-lg shadow-lg"
      >
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          className="text-4xl"
        >
          Register
        </motion.div>
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-2"
        >
          <motion.label animate={{ scale: 1 }} htmlFor="email">
            Email
          </motion.label>
          <motion.input
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ delay: 0.7 }}
            ref={emailRef}
            id="email"
            className="w-[16vw] h-8 p-2 rounded-lg"
            type="text"
          />
        </motion.div>
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-2"
        >
          <motion.label animate={{ scale: 1 }} htmlFor="password">
            Password
          </motion.label>
          <motion.input
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ delay: 1.1 }}
            ref={passwordRef}
            id="password"
            className="w-[16vw] h-8 p-2 rounded-lg"
            type="password"
          />
        </motion.div>
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-10"
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.87 }}
            onClick={handleSubmit}
            className="bg-green-400 p-3 rounded-lg"
          >
            Submit
          </motion.button>
          <Link to="/" className="">
            Login?
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default Register;
