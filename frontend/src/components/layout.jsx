import { Box } from "@mui/material";
import Navbar from "../navbar";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>

      {/* SIDEBAR FIXED LEFT */}
      <Sidebar />

      {/* RIGHT SIDE MAIN AREA */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "240px",           // sidebar width
          backgroundColor: "#111",
          minHeight: "100vh",
        }}
      >
        {/* NAVBAR FIXED TOP */}
        <Navbar />

        {/* PAGE CONTENT */}
        <Box sx={{ pt: "70px", p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
