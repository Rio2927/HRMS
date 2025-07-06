import React from "react";
import { Box } from "@mui/material";

const Primary = () => {
  return (
    <Box
      sx={{
        width: "100%", 
        display: "flex",
        padding: "100px 150px",
        justifyContent: "space-between",
      }}
    >
      {["#121212", "#444", "#555", "#666"].map((color, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            bgcolor: color,
            height: "200px",
            border: "1px solid white",
            padding: "20px",
            marginX: "10px",
            color: "white",
          }}
        >
          Hello
        </Box>
      ))}
    </Box>
  );
};

export default Primary;
