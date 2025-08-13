import React from "react";
import { Box, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Payslip = () => {
  const rows = [
    { year: 2025, month: "January", download: 120, amount: 5000 },
    { year: 2025, month: "February", download: 95, amount: 4200 },
    { year: 2025, month: "March", download: 150, amount: 6200 },
    { year: 2025, month: "April", download: 110, amount: 4800 },
    { year: 2025, month: "May", download: 180, amount: 7500 },
    { year: 2025, month: "June", download: 140, amount: 5800 },

    { year: 2025, month: "January", download: 120, amount: 5000 },
    { year: 2025, month: "February", download: 95, amount: 4200 },
    { year: 2025, month: "March", download: 150, amount: 6200 },
    { year: 2025, month: "April", download: 110, amount: 4800 },
    { year: 2025, month: "May", download: 180, amount: 7500 },
    { year: 2025, month: "June", download: 140, amount: 5800 },

    { year: 2025, month: "January", download: 120, amount: 5000 },
    { year: 2025, month: "February", download: 95, amount: 4200 },
    { year: 2025, month: "March", download: 150, amount: 6200 },
    { year: 2025, month: "April", download: 110, amount: 4800 },
    { year: 2025, month: "May", download: 180, amount: 7500 },
    { year: 2025, month: "June", download: 140, amount: 5800 },
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
                <strong>Year</strong>
              </TableCell>
              <TableCell>
                <strong>Month</strong>
              </TableCell>
              <TableCell>
                <strong>Download</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.month}</TableCell>
                <TableCell>
                  <Button
                    sx={{
                      background: "green",
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Download
                  </Button>
                </TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Payslip;
