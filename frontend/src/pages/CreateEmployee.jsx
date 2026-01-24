import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { CloudUpload, Visibility, VisibilityOff, CheckCircle, Error } from '@mui/icons-material';
import useResponsive from '../hooks/useResponsive';

/**
 * CreateEmployee Component
 * Form to create new employee with profile image upload
 */
function CreateEmployee() {
  const { isMobile } = useResponsive();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    type: '', // 'success', 'error', 'info'
    message: '',
  });

  /**
   * Handle form field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear status on change
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  /**
   * Handle file selection
   */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    if (!formData.first_name.trim()) {
      setStatus({ type: 'error', message: 'First name is required' });
      return false;
    }

    if (!formData.last_name.trim()) {
      setStatus({ type: 'error', message: 'Last name is required' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }

    if (formData.password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!file) {
      setStatus({ type: 'error', message: 'Please select a profile image' });
      return;
    }

    setIsLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('first_name', formData.first_name.trim());
      uploadData.append('last_name', formData.last_name.trim());
      uploadData.append('email', formData.email.trim());
      uploadData.append('password', formData.password);
      uploadData.append('file', file);

      const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(
        `${baseUrl}/create`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Reset form on success
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
      setFile(null);
      setFileName('');
      setShowPassword(false);

      setStatus({
        type: 'success',
        message: `Employee created successfully! Welcome ${formData.first_name}.`,
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to create employee. Please try again.';
      setStatus({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        padding: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: { xs: 3, sm: 4 },
            backgroundColor: '#1e1e1e',
            color: 'white',
            borderRadius: '12px',
            width: '100%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                '@media (max-width: 600px)': {
                  fontSize: '1.75rem',
                },
              }}
            >
              New Employee
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Add a new employee to the system
            </Typography>
          </Box>

          {/* Status Alert */}
          {status.message && (
            <Alert
              severity={status.type}
              icon={status.type === 'success' ? <CheckCircle /> : <Error />}
              sx={{
                mb: 3,
                backgroundColor:
                  status.type === 'success'
                    ? 'rgba(76, 175, 80, 0.1)'
                    : 'rgba(244, 67, 54, 0.1)',
                color: status.type === 'success' ? '#81c784' : '#ff6b6b',
                border: `1px solid ${
                  status.type === 'success'
                    ? 'rgba(76, 175, 80, 0.3)'
                    : 'rgba(244, 67, 54, 0.3)'
                }`,
              }}
              onClose={() => setStatus({ type: '', message: '' })}
            >
              {status.message}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="John"
                  InputLabelProps={{
                    sx: { color: '#b0bec5' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#90caf9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="Doe"
                  InputLabelProps={{
                    sx: { color: '#b0bec5' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#90caf9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="john@example.com"
                  InputLabelProps={{
                    sx: { color: '#b0bec5' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#90caf9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="Enter password"
                  InputLabelProps={{
                    sx: { color: '#b0bec5' },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={isLoading}
                          sx={{ color: '#90caf9' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#90caf9',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />
              </Grid>

              {/* File Upload */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                    border: '2px dashed #1976d2',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <input
                      type="file"
                      hidden
                      id="file-input"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.png,.jpeg,.gif,.webp"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="file-input"
                      style={{ cursor: 'pointer', display: 'block', textAlign: 'center' }}
                    >
                      <CloudUpload
                        sx={{
                          fontSize: 40,
                          color: '#1976d2',
                          mb: 1,
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Upload Profile Image
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {fileName || 'Click to select or drag and drop'}
                      </Typography>
                    </label>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #1976d2, #1565c0)',
                textTransform: 'none',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                },
                '&:disabled': {
                  background: '#424242',
                  color: '#666',
                },
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Creating...
                </Box>
              ) : (
                'Add Employee'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreateEmployee;
