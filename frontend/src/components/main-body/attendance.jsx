import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
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
  Grid,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, TrendingUp as TrendingIcon } from '@mui/icons-material';

const Attendance = () => {
  const [attendance, setAttendance] = useState([
    { id: 1, date: '2026-01-24', status: 'present', checkIn: '09:00', checkOut: '18:00' },
    { id: 2, date: '2026-01-23', status: 'present', checkIn: '09:15', checkOut: '17:45' },
    { id: 3, date: '2026-01-22', status: 'leave', checkIn: null, checkOut: null },
    { id: 4, date: '2026-01-21', status: 'present', checkIn: '09:00', checkOut: '18:00' },
    { id: 5, date: '2026-01-20', status: 'absent', checkIn: null, checkOut: null },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterMonth, setFilterMonth] = useState('2026-01');
  const [formData, setFormData] = useState({ date: '', status: 'present' });

  const stats = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    leave: attendance.filter(a => a.status === 'leave').length,
  };
  const attendancePercentage = Math.round((stats.present / attendance.length) * 100);

  const handleAddAttendance = () => {
    if (formData.date && formData.status) {
      setAttendance([
        { id: Math.max(...attendance.map(a => a.id), 0) + 1, ...formData, checkIn: formData.status === 'present' ? '09:00' : null, checkOut: formData.status === 'present' ? '18:00' : null },
        ...attendance,
      ]);
      setOpenDialog(false);
      setFormData({ date: '', status: 'present' });
    }
  };

  const getStatusColor = (status) => ({ present: 'success', absent: 'error', leave: 'warning' }[status] || 'default');

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {[
          { title: 'Present Days', value: stats.present, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { title: 'Absent Days', value: stats.absent, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
          { title: 'Leave Days', value: stats.leave, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
          { title: 'Attendance Rate', value: `${attendancePercentage}%`, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ borderRadius: 2, background: stat.gradient, color: 'white' }}>
              <CardContent>
                <TrendingIcon sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h4">{stat.value}</Typography>
                <Typography variant="body2">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Attendance Table */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader
              title="Attendance Records"
              subheader="View and manage your attendance"
              action={<Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Mark Attendance</Button>}
            />
            <CardContent>
              <TextField type="month" label="Filter by Month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} InputLabelProps={{ shrink: true }} sx={{ mb: 3, minWidth: 200 }} />
              <TableContainer component={Paper} sx={{ borderRadius: 1, maxHeight: '500px', overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Check In</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Check Out</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendance.map((record) => (
                      <TableRow key={record.id} hover>
                        <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip label={record.status.charAt(0).toUpperCase() + record.status.slice(1)} color={getStatusColor(record.status)} size="small" />
                        </TableCell>
                        <TableCell>{record.checkIn || '-'}</TableCell>
                        <TableCell>{record.checkOut || '-'}</TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<EditIcon />}>Edit</Button>
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

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Mark Attendance</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField fullWidth type="date" label="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} InputLabelProps={{ shrink: true }} sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={formData.status} label="Status" onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="leave">Leave</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAttendance} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance;
