import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
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
  Chip,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Download as DownloadIcon, Email as EmailIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Payslip = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const payslips = [
    {
      id: 1,
      month: 'June 2026',
      date: '2026-06-30',
      earnings: { base: 50000, da: 5000, hra: 10000, medical: 2500, other: 500 },
      deductions: { pf: 6750, tax: 8000, other: 250 },
      net: 53000,
      status: 'Paid',
    },
    {
      id: 2,
      month: 'May 2026',
      date: '2026-05-31',
      earnings: { base: 50000, da: 5000, hra: 10000, medical: 2500, other: 500 },
      deductions: { pf: 6750, tax: 8000, other: 250 },
      net: 53000,
      status: 'Paid',
    },
    {
      id: 3,
      month: 'April 2026',
      date: '2026-04-30',
      earnings: { base: 50000, da: 5000, hra: 10000, medical: 2500, other: 500 },
      deductions: { pf: 6750, tax: 8000, other: 250 },
      net: 53000,
      status: 'Paid',
    },
    {
      id: 4,
      month: 'March 2026',
      date: '2026-03-31',
      earnings: { base: 50000, da: 5000, hra: 10000, medical: 2500, other: 500 },
      deductions: { pf: 6750, tax: 7500, other: 250 },
      net: 52750,
      status: 'Paid',
    },
  ];

  const totalEarnings = (slip) => Object.values(slip.earnings).reduce((a, b) => a + b, 0);
  const totalDeductions = (slip) => Object.values(slip.deductions).reduce((a, b) => a + b, 0);
  const avgSalary = Math.round(payslips.reduce((a, b) => a + b.net, 0) / payslips.length);
  const yearTotal = payslips.reduce((a, b) => a + b.net, 0);

  const handleViewPayslip = (slip) => {
    setSelectedPayslip(slip);
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

  // Pie chart data for earnings breakdown
  const earningsData = [
    { name: 'Base', value: payslips[0].earnings.base },
    { name: 'HRA', value: payslips[0].earnings.hra },
    { name: 'DA', value: payslips[0].earnings.da },
    { name: 'Medical', value: payslips[0].earnings.medical },
  ];

  const COLORS = ['#667eea', '#43e97b', '#fa709a', '#4facfe'];

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
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Total Payslips</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>{payslips.length}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Latest Salary</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{payslips[0].net.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Avg Monthly</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{avgSalary.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ ...cardStyle, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>Year Total</Typography>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>₹{yearTotal.toLocaleString()}</Typography>
        </Paper>
      </Box>

      {/* Middle Section: Breakdown & Composition */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
          gap: 2,
          flex: { xs: 'none', lg: '0 0 40%' },
          minHeight: { xs: 'auto', lg: 0 },
        }}
      >
        {/* Deductions Breakdown */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '250px', lg: 0 } }}>
          <Typography variant="subtitle1" gutterBottom>Deductions Breakdown</Typography>
          <Box sx={{ overflowY: 'auto', pr: 1 }}>
            {[
              { label: 'PF', amount: payslips[0].deductions.pf },
              { label: 'Tax', amount: payslips[0].deductions.tax },
              { label: 'Other', amount: payslips[0].deductions.other },
            ].map((item) => (
              <Box key={item.label} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                  <Typography variant="caption">{item.label}</Typography>
                  <Typography variant="caption">₹{(item.amount / 1000).toFixed(1)}k</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(item.amount / totalDeductions(payslips[0])) * 100} sx={{ height: 6, borderRadius: 3 }} />
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Earnings Composition */}
        <Paper sx={{ ...cardStyle, minHeight: { xs: '300px', lg: 0 }, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ flex: '0 0 auto' }}>Earnings Composition</Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <Pie
                data={earningsData}
                cx="40%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {earningsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
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
                <TableCell align="right" sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', md: 'table-cell' }, p: { xs: 1, md: 2 } }}>Earnings</TableCell>
                <TableCell align="right" sx={{ bgcolor: '#1e1e1e', fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', md: 'table-cell' }, p: { xs: 1, md: 2 } }}>Deductions</TableCell>
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
                  <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', md: 'table-cell' }, p: { xs: 1, md: 2 } }}>₹{totalEarnings(slip).toLocaleString()}</TableCell>
                  <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, display: { xs: 'none', md: 'table-cell' }, p: { xs: 1, md: 2 } }}>₹{totalDeductions(slip).toLocaleString()}</TableCell>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>Payslip: {selectedPayslip?.month}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedPayslip && (
            <Box>
              {/* Company Header */}
              <Box sx={{ textAlign: 'center', mb: 3, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>HRMS Company</Typography>
                <Typography variant="body2" color="textSecondary">Payslip for {selectedPayslip.month}</Typography>
              </Box>

              {/* Earnings & Deductions */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Earnings</Typography>
                  {Object.entries(selectedPayslip.earnings).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, fontSize: '0.875rem' }}>
                      <Typography variant="body2">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      <Typography variant="body2">₹{value.toLocaleString()}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ pt: 1, borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <Typography variant="body2">Total</Typography>
                    <Typography variant="body2">₹{totalEarnings(selectedPayslip).toLocaleString()}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Deductions</Typography>
                  {Object.entries(selectedPayslip.deductions).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, fontSize: '0.875rem' }}>
                      <Typography variant="body2">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      <Typography variant="body2">₹{value.toLocaleString()}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ pt: 1, borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <Typography variant="body2">Total</Typography>
                    <Typography variant="body2">₹{totalDeductions(selectedPayslip).toLocaleString()}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Net Salary */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '2px solid #667eea' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Net Salary</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>₹{selectedPayslip.net.toLocaleString()}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" size="small" startIcon={<DownloadIcon />}>PDF</Button>
          <Button variant="outlined" size="small" startIcon={<EmailIcon />}>Email</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payslip;
