import { useState } from "react";
import "./App.css";
import Navbar from "./navbar";
import Sidebar from "./components/sidebar";
import Primary from "./components/primary";
import { Box } from "@mui/material";
import MainBody from "./components/mainbody";

function App() {
  return (
    <>
      <Navbar />
      <Box sx = {{ display: "flex"}}>
      <Sidebar />
      <MainBody>ashd</MainBody>
      </Box>

    </>
  );
}

export default App;
