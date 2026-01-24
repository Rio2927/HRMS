import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@hrms.com',
    phone: '+1 234 567 8900',
    department: 'HR Department',
    designation: 'HR Manager',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsAlerts: false,
    leaveApprovalNotifications: true,
    payslipNotifications: true,
    attendanceReminders: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    setEditingProfile(false);
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences updated!');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        {/* Profile Card with Avatar */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader
              avatar={<Avatar sx={{ width: 80, height: 80, backgroundColor: '#667eea' }}>JD</Avatar>}
              title={`${profileData.firstName} ${profileData.lastName}`}
              subheader={profileData.designation}
              action={
                <IconButton size="large" onClick={() => setEditingProfile(!editingProfile)}>
                  <EditIcon />
                </IconButton>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar sx={{ width: 120, height: 120, backgroundColor: '#667eea' }}>JD</Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#667eea',
                      color: 'white',
                      '&:hover': { backgroundColor: '#5568d3' },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{profileData.email}</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Department</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{profileData.department}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Settings Tabs */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: '1px solid #eee' }}>
              <Tab label="Profile Settings" />
              <Tab label="Password & Security" />
              <Tab label="Notifications" />
              <Tab label="Privacy" />
            </Tabs>

            <CardContent>
              {/* Profile Settings Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Edit Profile Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        disabled={!editingProfile}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        disabled={!editingProfile}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!editingProfile}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        value={profileData.department}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Designation"
                        name="designation"
                        value={profileData.designation}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveProfile}
                        disabled={!editingProfile}
                        fullWidth
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Password & Security Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Change Password</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              edge="end"
                              size="small"
                            >
                              {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSavePassword}
                        fullWidth
                      >
                        Update Password
                      </Button>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Two-Factor Authentication</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>Enable 2FA</Typography>
                      <Typography variant="body2" color="textSecondary">Add an extra layer of security to your account</Typography>
                    </Box>
                    <Switch checked={twoFactorEnabled} onChange={(e) => setTwoFactorEnabled(e.target.checked)} />
                  </Box>
                </Box>
              )}

              {/* Notifications Tab */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Notification Preferences</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          name="emailNotifications"
                          checked={notifications.emailNotifications}
                          onChange={handleNotificationChange}
                        />
                      }
                      label="Email Notifications (General updates and announcements)"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="smsAlerts"
                          checked={notifications.smsAlerts}
                          onChange={handleNotificationChange}
                        />
                      }
                      label="SMS Alerts (Critical alerts only)"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="leaveApprovalNotifications"
                          checked={notifications.leaveApprovalNotifications}
                          onChange={handleNotificationChange}
                        />
                      }
                      label="Leave Approval Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="payslipNotifications"
                          checked={notifications.payslipNotifications}
                          onChange={handleNotificationChange}
                        />
                      }
                      label="Payslip Released Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="attendanceReminders"
                          checked={notifications.attendanceReminders}
                          onChange={handleNotificationChange}
                        />
                      }
                      label="Daily Attendance Reminders"
                    />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveNotifications}
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Save Preferences
                  </Button>
                </Box>
              )}

              {/* Privacy Tab */}
              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Privacy & Data</Typography>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Be careful with these settings. Deleting your account is permanent and cannot be undone.
                  </Alert>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Download Your Data</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Download a copy of your personal data in JSON format.
                      </Typography>
                      <Button variant="outlined">Download Data</Button>
                    </Box>
                    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Delete Account</Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Permanently delete your account and all associated data.
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setOpenDeleteDialog(true)}
                      >
                        Delete Account
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ color: 'error.main', fontWeight: 600 }}>Delete Account</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone!
          </Alert>
          <Typography>
            Are you sure you want to delete your account? All your data including attendance, payslips, and leave records will be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained">Delete Permanently</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;