// import "./App.css";
// import Navbar from "./navbar";
// import Sidebar from "./components/sidebar";
// import { Box } from "@mui/material";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Dashboard from "./components/main-body/dashboard";
// import Salary from "./components/main-body/salary";
// import Leaves from "./components/main-body/leaves";
// import Attendance from "./components/main-body/attendance";
// import Payslip from "./components/main-body/payslip";
// import Login from "../src/pages/Login";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//       </Routes>

//       <Navbar />
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />

//         {/* Main Body */}
//         <Box // Main Body (Connected to Topbar (MUI - Appbar) and Sidebar)
//           sx={{
//             width: "calc(100vw - 260px)", // Previously 245px
//             height: "calc(100vh - 70px)",
//             // border: "2px solid white",
//             marginTop: "65px",
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/salary" element={<Salary />} />
//             <Route path="/leaves" element={<Leaves />} />
//             <Route path="/attendance" element={<Attendance />} />
//             <Route path="/payslip" element={<Payslip />} />
//           </Routes>
//         </Box>

//         {/* Main Body */}
//       </Box>
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import Navbar from "./navbar";
import Sidebar from "./components/sidebar";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Dashboard from "./components/main-body/dashboard";
import Salary from "./components/main-body/salary";
import Leaves from "./components/main-body/leaves";
import Attendance from "./components/main-body/attendance";
import Payslip from "./components/main-body/payslip";
import Login from "../src/pages/Login";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Box sx={{ display: "flex" }}>
        {!hideLayout && <Sidebar />}

        <Box
          sx={{
            width: !hideLayout ? "calc(100vw - 260px)" : "100vw",
            height: !hideLayout ? "calc(100vh - 70px)" : "100vh",
            marginTop: !hideLayout ? "65px" : 0,
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payslip" element={<Payslip />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
