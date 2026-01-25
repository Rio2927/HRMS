import React, { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';
import { Cancel as CancelIcon } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  const totalLeavesTaken = leaveBalances.annual.used + leaveBalances.sick.used + leaveBalances.casual.used;
  const totalLeavesAvailable = leaveBalances.annual.available + leaveBalances.sick.available + leaveBalances.casual.available;

  const leavesTrendData = [
    { month: 'Jan', taken: 2 },
    { month: 'Feb', taken: 1 },
    { month: 'Mar', taken: 0 },
    { month: 'Apr', taken: 3 },
    { month: 'May', taken: 2 },
    { month: 'Jun', taken: 2 },
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

  // Compact Card Style
  const cardStyle = {
    background: '#121212',
    borderRadius: '12px',
    padding: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        overflowY: { xs: 'auto', lg: 'hidden' },
      }}
    >
      {/* Top Section: 4 Compact Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2,
          flex: '0 0 auto',
        }}
      >
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Annual Leave</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{leaveBalances.annual.available}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontSize: { xs: '0.65rem', md: '0.7rem' } }}>of {leaveBalances.annual.total}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Sick Leave</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{leaveBalances.sick.available}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontSize: { xs: '0.65rem', md: '0.7rem' } }}>of {leaveBalances.sick.total}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Casual Leave</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{leaveBalances.casual.available}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, fontSize: { xs: '0.65rem', md: '0.7rem' } }}>of {leaveBalances.casual.total}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Total Available</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{totalLeavesAvailable}</Typography>
        </Paper>
      </Box>

      {/* Middle Section: Leave Balance & Trend */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: 2,
          flex: { xs: 'none', lg: '0 0 40%' },
          minHeight: { xs: 'auto', lg: 0 },
        }}
      >
        {/* Balance Breakdown */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '250px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Leave Balance</Typography>
          <Box sx={{ overflowY: 'auto', pr: 1 }}>
            {[
              { label: 'Annual', used: leaveBalances.annual.used, total: leaveBalances.annual.total },
              { label: 'Sick', used: leaveBalances.sick.used, total: leaveBalances.sick.total },
              { label: 'Casual', used: leaveBalances.casual.used, total: leaveBalances.casual.total },
            ].map((item) => (
              <Box key={item.label} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                  <Typography variant="caption">{item.label}</Typography>
                  <Typography variant="caption">{item.used}/{item.total} used</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(item.used / item.total) * 100} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Leaves Trend */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '300px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Monthly Leaves Taken</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leavesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#fff" fontSize={12} tickLine={false} />
              <YAxis stroke="#fff" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `${value} days`}
              />
              <Bar dataKey="taken" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Bottom Section: Leave Requests Table */}
      <Paper sx={{ ...cardStyle, p: 0, flex: { xs: 'none', lg: 1 }, minHeight: { xs: '400px', lg: 0 }, overflow: 'hidden' }}>
        <Box sx={{ p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">Leave Requests</Typography>
          <Button variant="contained" size="small" onClick={handleOpenDialog}>Request Leave</Button>
        </Box>
        <TableContainer sx={{ height: '100%', overflowY: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Type</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>Date Range</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }} align="center">Days</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', md: 'table-cell' }, p: { xs: 1, md: 2 } }}>Reason</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Status</TableCell>
                <TableCell align="right" sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>{request.type}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>
                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, fontWeight: 600, p: { xs: 1, md: 2 } }} align="center">{request.days}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', md: 'table-cell' }, p: { xs: 1, md: 2 } }}>{request.reason}</TableCell>
                  <TableCell sx={{ p: { xs: 1, md: 2 } }}>
                    <Chip label={request.status} color={getStatusColor(request.status)} size="small" sx={{ height: { xs: 20, md: 24 }, fontSize: { xs: '0.7rem', md: '0.8125rem' } }} />
                  </TableCell>
                  <TableCell align="right" sx={{ p: { xs: 1, md: 2 } }}>
                    {request.status === 'Pending' && (
                      <Button size="small" onClick={() => {}} sx={{ minWidth: { xs: 24, md: 30 }, p: 0.5 }}><CancelIcon fontSize="small" /></Button>
                    )}
                    {request.status !== 'Pending' && (
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}>-</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Request Leave Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Request New Leave</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
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
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitLeaveRequest}>Submit Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leaves;
