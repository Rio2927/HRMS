import { useState } from "react";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Working");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = () => {
    // console.log()
    // console.log("Email : ", email);
    // console.log("Password : ", password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Email is incorrect");
      return;
    } else {
      console.log("Email is correct");
      fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Rohit",
          email: "abc123",
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Response:", data))
        .catch((err) => console.error("Error:", err));
    }
  };

  // useEffect(() => {
  //   console.log("Email : ", email);
  //   console.log("Password : ", password);
  // }, [email,password]);

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
          Login
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
