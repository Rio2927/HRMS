import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";


function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Working");
  };

  const handleChange = () => {
    console.log("Working");
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
          borderRadius: "12px"
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
            variant="outlined"
            margin="normal"
            onChange={handleChange}
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
            variant="outlined"
            margin="normal"
            onChange={handleChange}
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
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
