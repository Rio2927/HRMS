import React, { useState, useEffect, useContext } from "react";
import { Typography, Box, Paper, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";
import useWidthBelow1024 from "../responsiveCheck";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setEmployeeID(user.employee_id);
  }, [user]);

  const isBelow1024 = useWidthBelow1024();

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

  const areaData = [
    { month: "Jan", Employees: 40 },
    { month: "Feb", Employees: 48 },
    { month: "Mar", Employees: 50 },
    { month: "Apr", Employees: 60 },
    { month: "May", Employees: 70 },
    { month: "Jun", Employees: 40 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Common Card Style
  const cardStyle = {
    background: "#121212",
    borderRadius: "12px",
    padding: "16px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center content vertically
    // border: "1px solid rgba(255, 255, 255, 0.1)", // Optional: adds subtle border
  };

  return (
    <Box
      sx={{
        height: "100%", // Take full height of parent
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        overflowY: { xs: "auto", lg: "hidden" }, // Allow scrolling on phones/tablets, hidden on desktop
      }}
    >
      {/* Top Section: 4 Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 2,
          flex: "0 0 auto",
          height: { xs: "auto", lg: "25%" },
        }}
      >
        {/* Allocation */}
        <Paper sx={cardStyle} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Allocation
          </Typography>
          <Box>
            <Typography variant="body2" noWrap>
              {name} ({employeeID})
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary" noWrap>
              {email}
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              Software Engineer
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              Manager: Andrew Richards
            </Typography>
          </Box>
        </Paper>

        {/* Leave Balance */}
        <Paper sx={cardStyle} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Leave Balance
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              flex: 1,
            }}
          >
            <Typography variant="h4">3/3</Typography>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={100}
                sx={{ color: "rgba(255, 255, 255, 0.1)", position: "absolute" }}
                size={60}
              />
              <CircularProgress
                variant="determinate"
                value={90}
                sx={{ color: "#1976d2" }}
                size={60}
              />
            </Box>
          </Box>
        </Paper>

        {/* Upcoming Holidays */}
        <Paper sx={cardStyle} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Holidays
          </Typography>
          <Box sx={{ overflowY: "auto", flex: 1 }}>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              • Columbus Day (Oct 13)
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              • Halloween (Oct 30)
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              • Christmas (Dec 25)
            </Typography>
          </Box>
        </Paper>

        {/* Pending Tasks */}
        <Paper sx={cardStyle} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Pending Tasks
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Typography variant="h2" color="error">
              5
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Bottom Section: 3 Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1.2fr 1.2fr" },
          gap: 2,
          flex: { xs: "none", lg: 1 },
          minHeight: { xs: "auto", lg: 0 },
        }}
      >
        {/* Line Chart */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: "300px", lg: 0 } }} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Task Completion Trend
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#fff" fontSize={12} tickLine={false} />
              <YAxis stroke="#fff" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e1e1e", border: "none" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="employees"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Pie Chart */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: "300px", lg: 0 } }} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Department
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "none" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Area Chart */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: "300px", lg: 0 } }} elevation={0}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Active Employees
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#fff" fontSize={12} tickLine={false} />
              <YAxis stroke="#fff" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "none" }} />
              <Area
                type="monotone"
                dataKey="Employees"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorEmp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
