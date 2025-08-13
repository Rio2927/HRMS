import React from "react";
import { Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Attendance = () => {
  const rows = [
    { name: "Rohit", age: 25, city: "Delhi" },
    { name: "Ankit", age: 28, city: "Mumbai" },
    { name: "Priya", age: 24, city: "Bangalore" },
    { name: "Rohit", age: 25, city: "Delhi" },
    { name: "Ankit", age: 28, city: "Mumbai" },
    { name: "Priya", age: 24, city: "Bangalore" },
    { name: "Rohit", age: 25, city: "Delhi" },
    { name: "Ankit", age: 28, city: "Mumbai" },
    { name: "Priya", age: 24, city: "Bangalore" },
    { name: "Rohit", age: 25, city: "Delhi" },
    { name: "Ankit", age: 28, city: "Mumbai" },
    { name: "Priya", age: 24, city: "Bangalore" },
  ];

  return (
    <Box
      sx={{
        // border: "2px solid white",
        width: "100%",
        padding: "15px 10px",
        height: "630px", 
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          height: "100%", // vertical scroll
          overflow: "auto", // enable scroll
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Age</strong>
              </TableCell>
              <TableCell>
                <strong>City</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;
