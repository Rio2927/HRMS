import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
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
  Chip,
  LinearProgress,
} from '@mui/material';
import { Download as DownloadIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Salary = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const currentSalary = {
    baseSalary: 50000,
    dearness: 5000,
    houseRent: 10000,
    medical: 2500,
    totalEarnings: 67500,
    providentFund: 6750,
    taxDeduction: 8000,
    totalDeductions: 14750,
    netSalary: 52750,
  };

  const salaryHistory = [
    { month: 'Jan', net: 52750 },
    { month: 'Feb', net: 52750 },
    { month: 'Mar', net: 52750 },
    { month: 'Apr', net: 53000 },
    { month: 'May', net: 53000 },
    { month: 'Jun', net: 53000 },
  ];

  const payslips = [
    { id: 1, month: 'June 2026', date: '2026-06-30', earnings: 68000, deductions: 15000, net: 53000, status: 'Paid' },
    { id: 2, month: 'May 2026', date: '2026-05-31', earnings: 68000, deductions: 15000, net: 53000, status: 'Paid' },
    { id: 3, month: 'April 2026', date: '2026-04-30', earnings: 68000, deductions: 15000, net: 53000, status: 'Paid' },
    { id: 4, month: 'March 2026', date: '2026-03-31', earnings: 67500, deductions: 14750, net: 52750, status: 'Paid' },
    { id: 5, month: 'Feb 2026', date: '2026-02-28', earnings: 67500, deductions: 14750, net: 52750, status: 'Paid' },
    { id: 6, month: 'Jan 2026', date: '2026-01-31', earnings: 67500, deductions: 14750, net: 52750, status: 'Paid' },
  ];

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setOpenDialog(true);
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
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Base Salary</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{currentSalary.baseSalary.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Total Earnings</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{currentSalary.totalEarnings.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Deductions</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{currentSalary.totalDeductions.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Net Salary</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{currentSalary.netSalary.toLocaleString()}</Typography>
        </Paper>
      </Box>

      {/* Middle Section: Breakdown & Trend */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: 2,
          flex: { xs: 'none', lg: '0 0 40%' },
          minHeight: { xs: 'auto', lg: 0 },
        }}
      >
        {/* Breakdown */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '250px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Breakdown</Typography>
          <Box sx={{ overflowY: 'auto', pr: 1 }}>
            {[
              { label: 'Base', amount: currentSalary.baseSalary },
              { label: 'HRA', amount: currentSalary.houseRent },
              { label: 'DA', amount: currentSalary.dearness },
              { label: 'Medical', amount: currentSalary.medical },
            ].map((item) => (
              <Box key={item.label} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                  <Typography variant="caption">{item.label}</Typography>
                  <Typography variant="caption">₹{item.amount / 1000}k</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(item.amount / currentSalary.totalEarnings) * 100} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Trend */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '300px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Salary Trend</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#fff" fontSize={12} tickLine={false} />
              <YAxis stroke="#fff" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `₹${value}`}
              />
              <Bar dataKey="net" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Bottom Section: Payslip Table */}
      <Paper sx={{ ...cardStyle, p: 0, flex: { xs: 'none', lg: 1 }, minHeight: { xs: '400px', lg: 0 }, overflow: 'hidden' }}>
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="subtitle1">Payslip History</Typography>
        </Box>
        <TableContainer sx={{ height: '100%', overflowY: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Month</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>Date</TableCell>
                <TableCell align="right" sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Net</TableCell>
                <TableCell sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Status</TableCell>
                <TableCell align="right" sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payslips.map((slip) => (
                <TableRow key={slip.id} hover>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>{slip.month}</TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', sm: 'table-cell' }, p: { xs: 1, md: 2 } }}>{new Date(slip.date).toLocaleDateString()}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', md: '0.875rem' }, p: { xs: 1, md: 2 } }}>₹{slip.net.toLocaleString()}</TableCell>
                  <TableCell sx={{ p: { xs: 1, md: 2 } }}>
                    <Chip label={slip.status} color="success" size="small" sx={{ height: { xs: 20, md: 24 }, fontSize: { xs: '0.7rem', md: '0.8125rem' } }} />
                  </TableCell>
                  <TableCell align="right" sx={{ p: { xs: 1, md: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                      <Button size="small" onClick={() => handleViewPayslip(slip)} sx={{ minWidth: { xs: 24, md: 30 }, p: 0.5 }}><ViewIcon fontSize="small" /></Button>
                      <Button size="small" sx={{ minWidth: { xs: 24, md: 30 }, p: 0.5 }}><DownloadIcon fontSize="small" /></Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>Payslip: {selectedPayslip?.month}</DialogTitle>
        <DialogContent>
          {selectedPayslip && (
            <Box sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Earnings</Typography>
                <Typography variant="body2" fontWeight="bold">₹{selectedPayslip.earnings.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Deductions</Typography>
                <Typography variant="body2" fontWeight="bold">₹{selectedPayslip.deductions.toLocaleString()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="subtitle1">Net Salary</Typography>
                <Typography variant="subtitle1" color="primary">₹{selectedPayslip.net.toLocaleString()}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" size="small" startIcon={<DownloadIcon />}>PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Salary;
