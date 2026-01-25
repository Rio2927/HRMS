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
  Typography,
  LinearProgress,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Attendance = () => {
  const [attendance, setAttendance] = useState([
    { id: 1, date: '2026-01-24', status: 'present', checkIn: '09:00', checkOut: '18:00' },
    { id: 2, date: '2026-01-23', status: 'present', checkIn: '09:15', checkOut: '17:45' },
    { id: 3, date: '2026-01-22', status: 'leave', checkIn: null, checkOut: null },
    { id: 4, date: '2026-01-21', status: 'present', checkIn: '09:00', checkOut: '18:00' },
    { id: 5, date: '2026-01-20', status: 'absent', checkIn: null, checkOut: null },
    { id: 6, date: '2026-01-19', status: 'present', checkIn: '09:00', checkOut: '18:00' },
    { id: 7, date: '2026-01-18', status: 'present', checkIn: '09:30', checkOut: '18:15' },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({ date: '', status: 'present' });

  const stats = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    leave: attendance.filter(a => a.status === 'leave').length,
  };
  const attendancePercentage = Math.round((stats.present / attendance.length) * 100);

  // Trend data for chart
  const trendData = [
    { week: 'Week 1', attendance: 80 },
    { week: 'Week 2', attendance: 85 },
    { week: 'Week 3', attendance: 90 },
    { week: 'Week 4', attendance: 88 },
  ];

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setFormData({ date: record.date, status: record.status });
    setOpenDialog(true);
  };

  const handleSaveAttendance = () => {
    if (formData.date && formData.status) {
      if (selectedRecord) {
        setAttendance(
          attendance.map(a => 
            a.id === selectedRecord.id 
              ? { ...a, date: formData.date, status: formData.status, checkIn: formData.status === 'present' ? a.checkIn || '09:00' : null, checkOut: formData.status === 'present' ? a.checkOut || '18:00' : null }
              : a
          )
        );
      } else {
        setAttendance([
          { id: Math.max(...attendance.map(a => a.id), 0) + 1, ...formData, checkIn: formData.status === 'present' ? '09:00' : null, checkOut: formData.status === 'present' ? '18:00' : null },
          ...attendance,
        ]);
      }
      setOpenDialog(false);
      setFormData({ date: '', status: 'present' });
      setSelectedRecord(null);
    }
  };

  const getStatusColor = (status) => ({ present: 'success', absent: 'error', leave: 'warning' }[status] || 'default');

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
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Present Days</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{stats.present}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Absent Days</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{stats.absent}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Leave Days</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{stats.leave}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Attendance Rate</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{attendancePercentage}%</Typography>
        </Paper>
      </Box>

      {/* Middle Section: Monthly Breakdown & Trend */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: 2,
          flex: { xs: 'none', lg: '0 0 40%' },
          minHeight: { xs: 'auto', lg: 0 },
        }}
      >
        {/* Monthly Stats */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '250px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Monthly Stats</Typography>
          <Box sx={{ overflowY: 'auto', pr: 1 }}>
            {[
              { label: 'Present', value: stats.present, total: attendance.length },
              { label: 'Absent', value: stats.absent, total: attendance.length },
              { label: 'Leave', value: stats.leave, total: attendance.length },
            ].map((item) => (
              <Box key={item.label} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                  <Typography variant="caption">{item.label}</Typography>
                  <Typography variant="caption">{item.value} days</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(item.value / item.total) * 100} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Attendance Trend */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '300px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Attendance Trend</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#fff" fontSize={12} tickLine={false} />
              <YAxis stroke="#fff" fontSize={12} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `${value}%`}
              />
              <Line type="monotone" dataKey="attendance" stroke="#667eea" dot={{ fill: '#667eea' }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Bottom Section: Attendance Table */}
      <Paper sx={{ ...cardStyle, p: 0, flex: { xs: 'none', lg: 1 }, minHeight: { xs: '400px', lg: 0 }, overflow: 'hidden' }}>
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="subtitle1">Attendance History</Typography>
        </Box>
        <TableContainer sx={{ height: '100%', overflowY: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Date</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Status</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>Check In</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>Check Out</TableCell>
                <TableCell align="right" sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record.id} hover>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ p: { xs: 1, md: 2 } }}>
                    <Chip label={record.status.charAt(0).toUpperCase() + record.status.slice(1)} color={getStatusColor(record.status)} size="small" sx={{ height: { xs: 20, md: 24 }, fontSize: { xs: '0.7rem', md: '0.8125rem' } }} />
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>{record.checkIn || '-'}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>{record.checkOut || '-'}</TableCell>
                  <TableCell align="right" sx={{ p: { xs: 1, md: 2 } }}>
                    <Button size="small" onClick={() => handleEditRecord(record)} sx={{ minWidth: { xs: 24, md: 30 }, p: 0.5 }}><EditIcon fontSize="small" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); setFormData({ date: '', status: 'present' }); setSelectedRecord(null); }} maxWidth="xs" fullWidth>
        <DialogTitle>{selectedRecord ? 'Edit Attendance' : 'Mark Attendance'}</DialogTitle>
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
          <Button onClick={() => { setOpenDialog(false); setFormData({ date: '', status: 'present' }); setSelectedRecord(null); }}>Cancel</Button>
          <Button onClick={handleSaveAttendance} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance;
