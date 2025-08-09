import React from "react";
import { Box, Typography } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { TextField } from "@mui/material";

import { useState } from "react";

const Leaves = () => {
  const [date, setDate] = useState(new Date());

  console.log("date : ",date);

  return (
    <Box
      sx={{
        // height: "100%",
        // maxWidth: "calc(100vw - 239.2px)",
        // maxWidth: "calc(100vw - 260px)",
        width: "calc(100vw - 260px)",
        padding: "10px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          background: "#121212",
          height: "100%",
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>Apply Leave</Typography>

        {/* Input Elements */}

        <Box
          sx={{
            width: "100%",
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: 2, // spacing between fields
          }}
        >
          <TextField
            type="date"
            label="From Date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            variant="outlined" // makes label work well with borders
            InputLabelProps={{ shrink: true }}
            sx={{
              flex: "1 1 45%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid white", // white border
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              input: { color: "white" },
              label: { color: "white" },
            }}
          />
          <TextField
            type="date"
            label="To Date"
            variant="outlined" // makes label work well with borders
            InputLabelProps={{ shrink: true }}
            sx={{
              flex: "1 1 45%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid white", // white border
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              input: { color: "white" },
              label: { color: "white" },
            }}
          />

          <Typography sx={{ width: "100%" }}>Leave Application</Typography>

          <TextField
            multiline
            minRows={15} // makes it tall
            placeholder="Write your reason here..."
            sx={{
              border: "2px solid white",
              width: "100%",
              input: { color: "white" },
              textarea: { color: "white" }, // for multiline text
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Leaves;
