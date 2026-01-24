import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Cancel as CancelIcon } from '@mui/icons-material';

const Leaves = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const leaveBalances = {
    annual: { total: 20, used: 8, available: 12 },
    sick: { total: 10, used: 2, available: 8 },
    casual: { total: 5, used: 1, available: 4 },
  };

  const leaveRequests = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2026-07-10',
      endDate: '2026-07-15',
      days: 6,
      status: 'Approved',
      reason: 'Personal vacation',
      approvedBy: 'Manager Name',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2026-06-25',
      endDate: '2026-06-26',
      days: 2,
      status: 'Approved',
      reason: 'Medical checkup',
      approvedBy: 'Manager Name',
    },
    {
      id: 3,
      type: 'Casual Leave',
      startDate: '2026-07-05',
      endDate: '2026-07-05',
      days: 1,
      status: 'Pending',
      reason: 'Family function',
      approvedBy: 'Pending',
    },
    {
      id: 4,
      type: 'Annual Leave',
      startDate: '2026-08-01',
      endDate: '2026-08-05',
      days: 5,
      status: 'Rejected',
      reason: 'Vacation',
      approvedBy: 'Manager Name',
    },
  ];

  const handleOpenDialog = () => {
    setFormData({ leaveType: 'annual', startDate: '', endDate: '', reason: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLeaveRequest = () => {
    if (formData.startDate && formData.endDate && formData.reason) {
      alert('Leave request submitted successfully!');
      handleCloseDialog();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        {/* Leave Balance Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Annual Leave</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5">{leaveBalances.annual.available}</Typography>
                <Typography variant="caption">of {leaveBalances.annual.total}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(leaveBalances.annual.available / leaveBalances.annual.total) * 100} sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Sick Leave</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5">{leaveBalances.sick.available}</Typography>
                <Typography variant="caption">of {leaveBalances.sick.total}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(leaveBalances.sick.available / leaveBalances.sick.total) * 100} sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Casual Leave</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h5">{leaveBalances.casual.available}</Typography>
                <Typography variant="caption">of {leaveBalances.casual.total}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(leaveBalances.casual.available / leaveBalances.casual.total) * 100} sx={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' },
                }}
              >
                Request Leave
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Requests Table */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader title="Leave Requests" subheader="History of all your leave requests and their status" />
            <CardContent>
              <TableContainer component={Paper} sx={{ borderRadius: 1, maxHeight: '600px', overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Leave Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date Range</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="center">Days</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{request.type}</TableCell>
                        <TableCell>
                          {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>{request.days}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <Chip label={request.status} color={getStatusColor(request.status)} size="small" />
                        </TableCell>
                        <TableCell>
                          {request.status === 'Pending' && (
                            <Button size="small" startIcon={<CancelIcon />} color="error">
                              Withdraw
                            </Button>
                          )}
                          {request.status !== 'Pending' && (
                            <Typography variant="caption">Processed</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Request Leave Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>Request New Leave</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Leave Type</InputLabel>
              <Select name="leaveType" value={formData.leaveType} onChange={handleInputChange} label="Leave Type">
                <MenuItem value="annual">Annual Leave</MenuItem>
                <MenuItem value="sick">Sick Leave</MenuItem>
                <MenuItem value="casual">Casual Leave</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="date"
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              type="date"
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              multiline
              rows={4}
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Please provide your reason for this leave request"
              fullWidth
            />

            <Alert severity="info">
              Make sure you have sufficient leave balance before submitting your request.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitLeaveRequest}>Submit Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leaves;
