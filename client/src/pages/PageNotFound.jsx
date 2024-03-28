import React from "react";
import { motion } from "framer-motion";

function PageNotFound() {
  return (
    <div className="h-screen w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold pt-8">404 - Route Not Found</h1>
        <p className="text-lg mt-4">
          The page you are looking for does not exist.
        </p>
      </motion.div>
    </div>
  );
}

export default PageNotFound;
