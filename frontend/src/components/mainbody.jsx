import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { AreaChart, Area } from "recharts";

import { Skeleton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import { MobileStepper } from "@mui/material";
import { Button } from "@mui/material";
import { Slider } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

import { BarChart, Bar } from "recharts";

const MainBody = () => {
  const data = [
    { month: "Jan", employees: 45 },
    { month: "Feb", employees: 50 },
    { month: "Mar", employees: 53 },
    { month: "Apr", employees: 60 },
    { month: "May", employees: 62 },
    { month: "Jun", employees: 64 },
  ];

  const pieData = [
    { name: "Engineering", value: 40 },
    { name: "Sales", value: 25 },
    { name: "HR", value: 15 },
    { name: "Marketing", value: 20 },
  ];

  // const barData = [
  //   { name: "John", leaves: 4 },
  //   { name: "Alice", leaves: 2 },
  //   { name: "David", leaves: 5 },
  //   { name: "Rohit", leaves: 3 },
  // ];

  // const donutData = [
  //   { name: "Male", value: 70 },
  //   { name: "Female", value: 30 },
  // ];

  const areaData = [
    { month: "Jan", Employees: 40 },
    { month: "Feb", Employees: 48 },
    { month: "Mar", Employees: 50 },
    { month: "Apr", Employees: 60 },
    { month: "May", Employees: 70 },
    { month: "Jun", Employees: 40 },
  ];

  // const dataBarChart = [
  //   { name: "Jan", value: 400 },
  //   { name: "Feb", value: 300 },
  //   { name: "Mar", value: 500 },
  //   { name: "Apr", value: 200 },
  // ];

  // const steps = ["Login", "Shipping", "Payment"];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Box // Main Body (Connected to Topbar (MUI - Appbar) and Sidebar)
      sx={{
        width: "calc(100vw - 245px)",
        height: "calc(100vh - 70px)",
        // border: "2px solid white",
        marginTop: "65px",
      }}
    >
      {/* This is main */}

      {/* Container for 4 box (Upper) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 20px",
        }}
      >
        {/* Allocation Box */}
        <Box
          sx={{
            // border: "2px solid white",
            borderRadius: "12px",
            padding: "20px",
            background: "#121212",
          }}
        >
          <Typography variant="h6">Allocation</Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Typography>John Doe (M274)</Typography>
            <Typography>Email : john@xyz.com</Typography>
            <Typography>Designation : Frontend Developer</Typography>
            <Typography>Reporting Manager : Andrew Richards</Typography>
          </Box>

          {/* Type of Progress Bar */}
          {/* <Skeleton variant="text" width={210} />
          <Skeleton variant="rectangular" height={118} /> */}
          {/* Type of Progress Bar */}
        </Box>

        {/* Leave Balance Box */}
        <Box
          sx={{
            // border: "2px solid white",
            borderRadius: "12px",
            padding: "20px",
            background: "#121212",
          }}
        >
          <Typography variant="h6">Leave Balance</Typography>

          {/* Type of Progress Bar */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography variant="h5">3/3</Typography>
            {/* <CircularProgress /> */}

            <CircularProgress
              variant="determinate"
              value={90}
              sx={{
                // Filled part
                color: "white",
              }}
              size={80}
            />
          </Box>
          {/* Type of Progress Bar */}
        </Box>

        {/* Upcoming Holidays Box */}
        <Box
          sx={{
            // border: "2px solid white",
            borderRadius: "12px",
            padding: "20px",
            background: "#121212",
          }}
        >
          <Typography variant="h6">Upcoming Holidays</Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Typography>Columbus Day : 13th October 2025 (Monday)</Typography>
            <Typography>Halloween : 30th October 2025 (Wednesday)</Typography>
            <Typography>Christmas : 25th December 2025 (Friday)</Typography>
            <Typography>New Year 2026 : 1st January 2025 (Friday)</Typography>
          </Box>
          {/* Type of Progress Bar */}
          {/* <Stepper activeStep={1}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          {/* Type of Progress Bar */}
          {/* Type of Progress Bar */}
          {/* <MobileStepper
            variant="dots"
            steps={3}
            position="static"
            activeStep={1}
            nextButton={<Button>Next</Button>}
            backButton={<Button>Back</Button>}
          /> */}
          {/* Type of Progress Bar */}
        </Box>

        {/* Pending Tasks Box */}
        <Box
          sx={{
            // border: "2px solid white",
            borderRadius: "12px",
            padding: "20px",
            background: "#121212",
          }}
        >
          <Typography variant="h6">Pending Tasks</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Typography variant="h2">5</Typography>
          </Box>
          {/* Type of Progress Bar */}
          {/* <Slider defaultValue={50} aria-label="Default" /> */}
          {/* Type of Progress Bar */}
          {/* Type of Progress Bar */}
          {/* <LinearProgress />
          <LinearProgress variant="determinate" value={70} /> */}
          {/* Type of Progress Bar */}
        </Box>
      </Box>

      <Box sx={{ padding: "0px 20px", display: "flex" }}>
        <Box
          sx={{
            // border: "2px solid red",                                                         // Iska border red tha
            borderRadius: "5px",
            // padding: "10px 20px"
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LineGraph */}
          <Box
            sx={{
              background: "#121212",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <ResponsiveContainer width={500} height={300}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="employees"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {/* Line Graph --- */}

          {/* Pie Chart */}
          <Box
            sx={{
              background: "#121212",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Department-wise Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          {/* Pie Chart */}

          {/* Bar Chart */}
          <Box
            sx={{
              background: "#121212",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Active Employees Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={areaData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Employees"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorEmp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          {/* Bar Chart */}
        </Box>
      </Box>
    </Box>
  );
};

export default MainBody;
