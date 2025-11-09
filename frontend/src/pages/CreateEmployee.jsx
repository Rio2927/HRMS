import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // setFormData((prev) => ({...prev,[e.target.name]:e.target.value}))

  const handleChange = (e) => {
    console.log("works", e.target.name);

    // if (e.target.name === "first_name") {
    //   setFirstName(e.target.value);
    // } else if (e.target.name === "last_name") {
    //   setLastName(e.target.value);
    // } else if (e.target.name === "email") {
    //   setEmail(e.target.value);
    // } else if (e.target.name === "password") {
    //   setPassword(e.target.value);
    // }
    // setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    //  This square brackets for e.target.name is used for setting values dynamically (Dynamic keys in an object)
    //  e.target.name ki value dynamically aayegi jab handleChange() call hoga
    //  For example Email waali field pe handleChange() call hua..therefore ["email"] : e.target.value ho jayega
    //  To email field me for assumptions "xyz@gmail.com" enter hua..to email field ki value aise set hogi :
    //  ["email"] : xyz@gmail.com

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log("first_name : ", formData.first_name);
    console.log("last_name  : ", formData.last_name);
    console.log("email      : ", formData.email);
    console.log("password   : ", formData.password);
  }, [
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.password,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Working");
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handlePasswordChange = (e) => setPassword(e.target.value);

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
      const uploadData = new FormData(); // ✅ rename variable
      uploadData.append("first_name", formData.first_name);
      uploadData.append("last_name", formData.last_name);
      uploadData.append("email", formData.email);
      uploadData.append("password", formData.password);
      uploadData.append("file", file);

      console.log("Uploading:", formData);

      console.log("First Name : ", formData.first_name);
      console.log("Last Name  : ", formData.last_name);
      console.log("Email      : ", formData.email);
      console.log("Password   : ", formData.password);
      console.log("file", file);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload`,
        uploadData,
        // formData,
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
            label="First Name"
            name="first_name"
            type="first_name"
            value={formData.first_name}
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
            label="Last Name"
            name="last_name"
            type="last_name"
            value={formData.last_name}
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            variant="outlined"
            margin="normal"
            // onChange={handleEmailChange}
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
            value={formData.password}
            variant="outlined"
            margin="normal"
            // onChange={handlePasswordChange}
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
