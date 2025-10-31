import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function App() {
  // const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Working");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);

  //   const handleCreate = () => {
  //     console.log("Employee created..");
  //   };

  const handleFileChange = (e) => {
    console.log("File uploaded");
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    console.log("File uploaded");

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // If you want to send additional fields:
      formData.append("employee_id", "EMP12345");

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStatus(`✅ Upload successful: ${res.data.message}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        "&.MuiContainer-root": {
          minWidth: "0 !important", // force override
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          // marginTop: 8,
          backgroundColor: "#121212",
          color: "white",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          New Employee
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            variant="outlined"
            margin="normal"
            onChange={handleEmailChange}
            required
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            InputProps={{
              style: { color: "white", borderColor: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#90caf9", // border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", // border when focused
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            variant="outlined"
            margin="normal"
            onChange={handlePasswordChange}
            required
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            InputProps={{
              style: { color: "white", borderColor: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#90caf9", // border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2", // border when focused
                },
              },
            }}
          />
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png,.xlsx,.csv"
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleUpload}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
