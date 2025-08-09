import "./App.css";
import Navbar from "./navbar";
import Sidebar from "./components/sidebar";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/main-body/dashboard";
import Salary from "./components/main-body/salary";
import Leaves from "./components/main-body/leaves"

function App() {
  return (
    <Router>

      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        {/* Main Body */}
        <Box                                                              // Main Body (Connected to Topbar (MUI - Appbar) and Sidebar)
          sx={{
            width: "calc(100vw - 260px)", // Previously 245px
            height: "calc(100vh - 70px)",
            // border: "2px solid white",
            marginTop: "65px",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/leaves" element={<Leaves />} />
            {/* <Route path="/holidays" element={<Holidays />} /> */}
          </Routes>
        </Box>

        {/* Main Body */}
      </Box>
    </Router>
  );
}

export default App;
