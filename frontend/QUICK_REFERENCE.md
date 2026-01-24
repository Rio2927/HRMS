# Frontend Quick Reference Guide

## 🚀 Quick Start

```bash
# Installation
cd frontend
npm install

# Development
npm run dev

# Production Build
npm run build

# Linting
npm run lint
```

---

## 📱 Responsive Breakpoints

```javascript
import useResponsive from '../hooks/useResponsive';

function Component() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  if (isMobile) return <MobileLayout />;
  if (isTablet) return <TabletLayout />;
  return <DesktopLayout />;
}
```

Or use MUI sx prop:
```javascript
<Box sx={{
  fontSize: { xs: '14px', md: '16px' },      // Mobile, Desktop
  padding: { xs: 1, sm: 2, md: 4 },          // Mobile, Tablet, Desktop
  display: { xs: 'block', md: 'flex' }        // Block on mobile, Flex on desktop
}}>
  Content
</Box>
```

---

## 🎨 Theme Colors

```javascript
// Import theme
import theme from '../theme/theme';

// Use with MUI
<Box sx={{ color: theme.palette.primary.main }}>
  Primary Blue: #1976d2
</Box>

// Or use CSS variables
<Box sx={{ color: 'var(--primary)' }}>
  Primary Blue
</Box>
```

### Available Colors
- `primary.main`: #1976d2
- `primary.light`: #42a5f5
- `primary.dark`: #1565c0
- `secondary.main`: #dc004e
- `background.default`: #121212
- `background.paper`: #1e1e1e

---

## 📝 Form Validation Pattern

```javascript
import { useState } from 'react';
import { Alert, TextField, Button, CircularProgress } from '@mui/material';

function MyForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(url, formData);
      // Handle success
    } catch (error) {
      setError(error.response?.data?.message || 'Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
      
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={isLoading}
        fullWidth
      />
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <CircularProgress size={20} /> : 'Submit'}
      </Button>
    </form>
  );
}
```

---

## 🎯 Common MUI Components

### Typography
```javascript
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Small text</Typography>
```

### Buttons
```javascript
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
<Button fullWidth>Full Width</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
```

### Input Fields
```javascript
<TextField label="Email" type="email" fullWidth />
<TextField label="Password" type="password" fullWidth />
<TextField multiline rows={4} />
<TextField select defaultValue="">
  <MenuItem value="option1">Option 1</MenuItem>
  <MenuItem value="option2">Option 2</MenuItem>
</TextField>
```

### Alerts
```javascript
<Alert severity="success">Success message</Alert>
<Alert severity="error">Error message</Alert>
<Alert severity="warning">Warning message</Alert>
<Alert severity="info">Info message</Alert>
```

### Boxes & Grids
```javascript
<Box sx={{ p: 2, gap: 1 }}>Simple container</Box>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>Column</Grid>
</Grid>
```

---

## 🔗 Navigation

### Navigate Programmatically
```javascript
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  return (
    <Button onClick={() => navigate('/dashboard')}>
      Go to Dashboard
    </Button>
  );
}
```

### Protected Routes
```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🔐 Authentication

### Using Auth Context
```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Component() {
  const { user, login, logout } = useContext(AuthContext);
  
  return (
    <>
      <p>User: {user.name}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

### API Calls with Auth
```javascript
const response = await axios.post(url, data, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

---

## 📊 Common Patterns

### Loading State
```javascript
const [isLoading, setIsLoading] = useState(false);

return (
  <Button disabled={isLoading}>
    {isLoading ? <CircularProgress size={20} /> : 'Submit'}
  </Button>
);
```

### Error Handling
```javascript
const [error, setError] = useState('');

try {
  // API call
} catch (error) {
  setError(error.response?.data?.message || 'An error occurred');
}
```

### Success Notification
```javascript
const [success, setSuccess] = useState('');

const handleSuccess = () => {
  setSuccess('Operation completed!');
  setTimeout(() => setSuccess(''), 3000); // Auto-dismiss
};
```

---

## 🎨 CSS Utilities

### Spacing
```
.p-sm { padding: 8px; }
.p-md { padding: 16px; }
.p-lg { padding: 24px; }
.m-sm { margin: 8px; }
.m-md { margin: 16px; }
.m-lg { margin: 24px; }
.gap-md { gap: 16px; }
```

### Flexbox
```
.flex-center { display: flex; justify-content: center; align-items: center; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-column { display: flex; flex-direction: column; }
```

### Shadows
```
.shadow-sm { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); }
.shadow-md { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); }
.shadow-lg { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); }
```

### Border Radius
```
.rounded-md { border-radius: 8px; }
.rounded-lg { border-radius: 12px; }
```

---

## 🔄 State Management

### Local Component State
```javascript
const [count, setCount] = useState(0);
const [formData, setFormData] = useState({});
const [isLoading, setIsLoading] = useState(false);
```

### Shared Auth State
```javascript
const { user, login, logout } = useContext(AuthContext);
```

### Local Storage
```javascript
// Save
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(user));

// Retrieve
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Clear
localStorage.removeItem('token');
localStorage.clear();
```

---

## 📱 Mobile-First Styles

```javascript
// Start with mobile, then add desktop styles
<Box sx={{
  // Mobile (default)
  width: '100%',
  padding: 2,
  flexDirection: 'column',
  
  // Tablet and up
  md: {
    width: '50%',
    padding: 4,
  },
  
  // Desktop and up
  lg: {
    width: '33%',
  }
}}>
  Content
</Box>
```

---

## 🎯 Component Structure Template

```javascript
import { Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useResponsive from '../hooks/useResponsive';

/**
 * ComponentName Component
 * Brief description of what it does
 * 
 * @returns {JSX.Element} Component JSX
 */
function ComponentName() {
  const { user } = useContext(AuthContext);
  const { isMobile } = useResponsive();

  return (
    <Box sx={{
      p: { xs: 2, md: 4 },
      display: { xs: 'block', md: 'flex' }
    }}>
      <Typography variant={isMobile ? 'h5' : 'h4'}>
        Title
      </Typography>
      <Button>Action</Button>
    </Box>
  );
}

export default ComponentName;
```

---

## 🔗 Useful Links

- [MUI Documentation](https://mui.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

## ⚡ Performance Tips

1. **Use `useCallback`** for event handlers in lists
2. **Use `useMemo`** for expensive calculations
3. **Lazy load** components with `React.lazy()`
4. **Code split** routes
5. **Optimize images** before uploading
6. **Minimize re-renders** with proper dependencies

---

## 🐛 Debugging

### DevTools
- Open: F12 or Ctrl+Shift+I
- Elements tab: Inspect DOM
- Console tab: View logs and errors
- Network tab: Check API calls

### React DevTools
- Install browser extension
- Check component props
- Check component state
- Check context values

---

## 📋 Checklist Before Committing

- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Form validation working
- [ ] Error handling in place
- [ ] Responsive design tested
- [ ] Loading states included
- [ ] JSDoc comments added
- [ ] No unused variables
- [ ] Proper indentation
- [ ] Accessibility checked

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test production build locally
- [ ] Check bundle size
- [ ] Verify all images optimize
- [ ] Test all routes
- [ ] Test all forms
- [ ] Test authentication
- [ ] Check console for errors
- [ ] Test on mobile device
- [ ] Verify API endpoints

---

**Version**: 1.0  
**Last Updated**: January 24, 2026
