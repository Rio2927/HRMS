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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Salary = () => {
  const rows = [
    {
      name: "John",
      age: 28,
      role: "Developer",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      salary: "$80,000",
    },
    {
      name: "Jane",
      age: 32,
      role: "Designer",
      email: "jane@example.com",
      phone: "9876543211",
      department: "Design",
      salary: "$75,000",
    },
    {
      name: "Mike",
      age: 25,
      role: "Tester",
      email: "mike@example.com",
      phone: "9876543212",
      department: "QA",
      salary: "$70,000",
    },
    {
      name: "John",
      age: 28,
      role: "Developer",
      email: "john.doe@example.com",
      phone: "9876543213",
      department: "Engineering",
      salary: "$80,000",
    },
    {
      name: "Jane",
      age: 32,
      role: "Designer",
      email: "jane.doe@example.com",
      phone: "9876543214",
      department: "Design",
      salary: "$75,000",
    },
    {
      name: "Mike",
      age: 25,
      role: "Tester",
      email: "mike.smith@example.com",
      phone: "9876543215",
      department: "QA",
      salary: "$70,000",
    },
    {
      name: "John",
      age: 28,
      role: "Developer",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      salary: "$80,000",
    },
    {
      name: "John",
      age: 28,
      role: "Developer",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      salary: "$80,000",
    },
    {
      name: "John",
      age: 28,
      role: "Developer",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      salary: "$80,000",
    },
    {
      name: "John",
      age: 28,
      role: "Developer",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      salary: "$80,000",
    },
  ];

  const histogramData = [
    { range: "0-10", count: 2 },
    { range: "10-20", count: 5 },
    { range: "20-30", count: 8 },
    { range: "30-40", count: 3 },
    { range: "40-50", count: 7 },
    { range: "50-60", count: 4 },
    { range: "0-10", count: 2 },
    { range: "10-20", count: 5 },
    { range: "20-30", count: 8 },
    { range: "30-40", count: 3 },
    { range: "40-50", count: 7 },
    { range: "50-60", count: 4 },
    { range: "0-10", count: 2 },
    { range: "10-20", count: 5 },
    { range: "20-30", count: 8 },
    { range: "30-40", count: 3 },
    { range: "40-50", count: 7 },
    { range: "50-60", count: 4 },
    { range: "0-10", count: 2 },
    { range: "10-20", count: 5 },
    { range: "20-30", count: 8 },
    { range: "30-40", count: 3 },
    { range: "40-50", count: 7 },
    { range: "50-60", count: 4 },
  ];

  return (
    <Box
      sx={{
        // height: "100%",
        // maxWidth: "calc(100vw - 239.2px)",
        // maxWidth: "calc(100vw - 260px)",
        width: "calc(100vw - 260px)",
        padding: "20px",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          height: "600px",
          // maxHeight: 400,
          // overflowY: "auto",
          // overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Table aria-label="salary table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Email</TableCell>
              {/* <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Salary</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                {/* <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.department}</TableCell>
                <TableCell align="right">{row.salary}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Box sx={{marginTop : "20px",background: "#121212",padding: "20px",borderRadius: "12px"}}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histogramData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            label={{ value: "Range", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </Box>


    </Box>
  );
};

export default Salary;
