import React from "react";
import { Typography, Box } from "@mui/material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { AreaChart, Area } from "recharts";
import { CircularProgress } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "../../App.css";

const Dashboard = () => {
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

  return (
    <>
      {/* This is main */}

      {/* Container for 4 box (Upper) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 10px",
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
          <Typography variant="h6" textAlign={"center"}>
            Allocation
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Typography>John Doe (M274)</Typography>
            <Typography>Email : john@xyz.com</Typography>
            <Typography>Designation : Software Engineer</Typography>
            <Typography>Reporting Manager : Andrew Richards</Typography>
          </Box>
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
          <Typography variant="h6" textAlign={"center"}>Leave Balance</Typography>

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
          <Typography variant="h6" textAlign={"center"}>
            Upcoming Holidays
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Typography>Columbus Day : 13th October 2025 (Monday)</Typography>
            <Typography>Halloween : 30th October 2025 (Wednesday)</Typography>
            <Typography>Christmas : 25th December 2025 (Friday)</Typography>
            <Typography>New Year 2026 : 1st January 2025 (Friday)</Typography>
          </Box>

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
        </Box>
      </Box>

      <Box sx={{ padding: "10px 10px", display: "flex" }}>
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
              width: "45%",
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              Pending Tasks
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
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
              width: "25%",
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
                  outerRadius={90}
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
              width: "25%",
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

      {/* Table */}

      <Box
        sx={{
          // height: "100%",
          // maxWidth: "calc(100vw - 239.2px)",
          // maxWidth: "calc(100vw - 260px)",
          width: "calc(100vw - 260px)",
          padding: "15px 10px",
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
            borderRadius: "12px"
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

        {/* <Box
          sx={{
            marginTop: "20px",
            background: "#121212",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
        </Box> */}
      </Box>
    </>
  );
};

export default Dashboard;

// Claude code

// import React from "react";
// import { Typography, Box } from "@mui/material";
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { LineChart, Line } from "recharts";
// import { PieChart, Pie, Cell } from "recharts";
// import { AreaChart, Area } from "recharts";
// import { CircularProgress } from "@mui/material";

// const Dashboard = () => {
//   const data = [
//     { month: "Jan", employees: 45 },
//     { month: "Feb", employees: 50 },
//     { month: "Mar", employees: 53 },
//     { month: "Apr", employees: 60 },
//     { month: "May", employees: 62 },
//     { month: "Jun", employees: 64 },
//   ];

//   const pieData = [
//     { name: "Engineering", value: 40 },
//     { name: "Sales", value: 25 },
//     { name: "HR", value: 15 },
//     { name: "Marketing", value: 20 },
//   ];

//   const areaData = [
//     { month: "Jan", Employees: 40 },
//     { month: "Feb", Employees: 48 },
//     { month: "Mar", Employees: 50 },
//     { month: "Apr", Employees: 60 },
//     { month: "May", Employees: 70 },
//     { month: "Jun", Employees: 40 },
//   ];

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white" }}>
//       {/* Container for 4 box (Upper) */}
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr",
//             sm: "1fr 1fr",
//             lg: "1fr 1fr 1fr 1fr"
//           },
//           gap: { xs: 2, sm: 3 },
//           padding: { xs: "16px", sm: "20px" },
//         }}
//       >
//         {/* Allocation Box */}
//         <Box
//           sx={{
//             borderRadius: "12px",
//             padding: { xs: "16px", sm: "20px" },
//             background: "#121212",
//             minHeight: "200px",
//           }}
//         >
//           <Typography variant="h6" textAlign={"center"}>
//             Allocation
//           </Typography>
//           <Box sx={{ marginTop: "20px" }}>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word" }}>
//               John Doe (M274)
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word" }}>
//               Email : john@xyz.com
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word" }}>
//               Designation : Software Engineer
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word" }}>
//               Reporting Manager : Andrew Richards
//             </Typography>
//           </Box>
//         </Box>

//         {/* Leave Balance Box */}
//         <Box
//           sx={{
//             borderRadius: "12px",
//             padding: { xs: "16px", sm: "20px" },
//             background: "#121212",
//             minHeight: "200px",
//           }}
//         >
//           <Typography variant="h6">Leave Balance</Typography>

//           {/* Type of Progress Bar */}
//           <Box
//             sx={{
//               marginTop: "20px",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "20px",
//               flexDirection: { xs: "column", sm: "row" },
//             }}
//           >
//             <Typography variant="h5">3/3</Typography>
//             <CircularProgress
//               variant="determinate"
//               value={90}
//               sx={{
//                 color: "white",
//               }}
//               size={80}
//             />
//           </Box>
//         </Box>

//         {/* Upcoming Holidays Box */}
//         <Box
//           sx={{
//             borderRadius: "12px",
//             padding: { xs: "16px", sm: "20px" },
//             background: "#121212",
//             minHeight: "200px",
//           }}
//         >
//           <Typography variant="h6" textAlign={"center"}>
//             Upcoming Holidays
//           </Typography>
//           <Box sx={{ marginTop: "20px" }}>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word", mb: 1 }}>
//               Columbus Day : 13th October 2025 (Monday)
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word", mb: 1 }}>
//               Halloween : 30th October 2025 (Wednesday)
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word", mb: 1 }}>
//               Christmas : 25th December 2025 (Friday)
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, wordBreak: "break-word" }}>
//               New Year 2026 : 1st January 2025 (Friday)
//             </Typography>
//           </Box>
//         </Box>

//         {/* Pending Tasks Box */}
//         <Box
//           sx={{
//             borderRadius: "12px",
//             padding: { xs: "16px", sm: "20px" },
//             background: "#121212",
//             minHeight: "200px",
//           }}
//         >
//           <Typography variant="h6">Pending Tasks</Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginTop: "20px",
//               height: "100px",
//             }}
//           >
//             <Typography variant="h2">5</Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* Charts Container */}
//       <Box
//         sx={{
//           padding: { xs: "16px", sm: "20px" },
//           paddingTop: 0,
//         }}
//       >
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               md: "1fr 1fr",
//               lg: "1fr 1fr 1fr"
//             },
//             gap: { xs: 2, sm: 3 },
//             width: "100%",
//           }}
//         >
//           {/* LineGraph */}
//           <Box
//             sx={{
//               background: "#121212",
//               borderRadius: "12px",
//               padding: { xs: "16px", sm: "20px" },
//               minHeight: "350px",
//             }}
//           >
//             <Typography variant="h6" textAlign={"center"} sx={{ mb: 2 }}>
//               Employee Growth
//             </Typography>
//             <Box sx={{ width: "100%", height: "300px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={data}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="employees"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Box>
//           </Box>

//           {/* Pie Chart */}
//           <Box
//             sx={{
//               background: "#121212",
//               borderRadius: "12px",
//               padding: { xs: "16px", sm: "20px" },
//               minHeight: "350px",
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
//               Department-wise Distribution
//             </Typography>
//             <Box sx={{ width: "100%", height: "300px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     label
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Box>
//           </Box>

//           {/* Area Chart */}
//           <Box
//             sx={{
//               background: "#121212",
//               borderRadius: "12px",
//               padding: { xs: "16px", sm: "20px" },
//               minHeight: "350px",
//               gridColumn: { xs: "1", md: "1 / -1", lg: "auto" },
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
//               Active Employees Over Time
//             </Typography>
//             <Box sx={{ width: "100%", height: "300px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                   data={areaData}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//                 >
//                   <defs>
//                     <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//                       <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Area
//                     type="monotone"
//                     dataKey="Employees"
//                     stroke="#8884d8"
//                     fillOpacity={1}
//                     fill="url(#colorEmp)"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
