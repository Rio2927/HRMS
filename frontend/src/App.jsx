import './App.css';
import Navbar from './navbar';
import Sidebar from './components/sidebar';
import { Box, ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import theme from './theme/theme';

// Pages & Components
import Dashboard from './components/main-body/dashboard';
import Salary from './components/main-body/salary';
import Leaves from './components/main-body/leaves';
import Attendance from './components/main-body/attendance';
import Payslip from './components/main-body/payslip';
import Settings from './components/main-body/settings';
import Login from './pages/Login';
import CreateEmployee from './pages/CreateEmployee';
import ProtectedRoute from './components/protectedRoute';
import { AuthProvider } from './context/AuthProvider';

/**
 * AppContent Component
 * Handles routing and layout rendering based on current location
 */
function AppContent() {
  const location = useLocation();

  // Routes that should not display the navbar and sidebar
  const noLayoutRoutes = ['/login', '/create-employee'];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Box sx={{ display: 'flex' }}>
        {!hideLayout && <Sidebar />}

        {/* Main Content Area */}
        <Box
          sx={{
            width: !hideLayout ? { xs: '100%', sm: '100%', lg: 'calc(100vw - 260px)' } : '100vw',
            height: !hideLayout ? 'calc(100vh - 70px)' : '100vh',
            marginTop: !hideLayout ? { xs: '70px', sm: '70px', lg: '65px' } : 0,
            overflowY: { xs: 'auto', md: 'hidden' },
            backgroundColor: '#121212',
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-employee"
              element={
                <ProtectedRoute>
                  <CreateEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/salary"
              element={
                <ProtectedRoute>
                  <Salary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaves"
              element={
                <ProtectedRoute>
                  <Leaves />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payslip"
              element={
                <ProtectedRoute>
                  <Payslip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

/**
 * App Component
 * Root application component with theme and auth provider
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
