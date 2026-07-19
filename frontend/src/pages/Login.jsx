import { useState, useContext } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import useResponsive from '../hooks/useResponsive';

/**
 * Login Component
 * Handles user authentication with email and password
 */
function Login() {
  const { login, loginDemo } = useContext(AuthContext);
  const { isMobile } = useResponsive();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Email validation using regex
   */
  const isValidEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setIsLoading(true);
    setEmail('demo@hrms.local');
    setPassword('demo123');

    try {
      await loginDemo();
    } catch (err) {
      setError(err.message || 'Demo login failed. Please try again.');
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
              HRMS Portal
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Employee Management System
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: '#ff6b6b',
                border: '1px solid rgba(244, 67, 54, 0.3)',
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              margin="normal"
              variant="outlined"
              required
              disabled={isLoading}
              placeholder="you@example.com"
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
                mb: 2,
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              margin="normal"
              variant="outlined"
              required
              disabled={isLoading}
              placeholder="Enter your password"
              InputLabelProps={{
                sx: { color: '#b0bec5' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
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
                mb: 3,
              }}
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 2,
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
                  Signing in...
                </Box>
              ) : (
                'Sign In'
              )}
            </Button>

            <Button
              type="button"
              variant="outlined"
              fullWidth
              disabled={isLoading}
              onClick={handleDemoLogin}
              sx={{
                mt: 1.5,
                py: 1.25,
                fontSize: '0.95rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                borderColor: 'rgba(144, 202, 249, 0.5)',
                color: '#90caf9',
                '&:hover': {
                  borderColor: '#90caf9',
                  backgroundColor: 'rgba(144, 202, 249, 0.08)',
                },
                '&:disabled': {
                  color: '#666',
                  borderColor: '#424242',
                },
              }}
            >
              Use Demo Account
            </Button>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 3, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', pt: 2 }}>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              Demo account logs in locally (no backend)
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
