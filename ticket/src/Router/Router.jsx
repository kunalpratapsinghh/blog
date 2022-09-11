import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Login from "../component/Login";
import Home from "../component/Home";
import Signup from "../component/Signup";
import Private from "../Private/private";

const Router = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Private><Home /></Private>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Box>
  );
};

export default Router;
