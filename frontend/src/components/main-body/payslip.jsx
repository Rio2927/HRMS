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
  Chip,
} from '@mui/material';
import { Download as DownloadIcon, Print as PrintIcon, Email as EmailIcon, Visibility as ViewIcon } from '@mui/icons-material';

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

  const handleViewPayslip = (slip) => {
    setSelectedPayslip(slip);
    setOpenDialog(true);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: { xs: 2, md: 3 },
        overflowY: { xs: 'auto', lg: 'hidden' },
      }}
    >
      <Grid container spacing={3} sx={{ flex: '0 0 auto' }}>
        {/* Overview Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2">Total Payslips</Typography>
              <Typography variant="h5">{payslips.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2">Latest Salary</Typography>
              <Typography variant="h5">₹{payslips[0].net.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2">Avg Monthly</Typography>
              <Typography variant="h5">₹{Math.round(payslips.reduce((a, b) => a + b.net, 0) / payslips.length).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2">This Year Total</Typography>
              <Typography variant="h5">₹{payslips.reduce((a, b) => a + b.net, 0).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Payslips Table */}
        <Grid item xs={12} sx={{ flex: { xs: 'none', lg: 1 }, minHeight: { xs: '400px', lg: 0 } }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Payslip History" subheader="View, download, or print your payslips" />
            <CardContent sx={{ flex: 1, overflow: 'hidden', p: 0 }}>
              <TableContainer component={Paper} sx={{ borderRadius: 0, height: '100%', overflowY: 'auto', boxShadow: 'none' }}>
                <Table stickyHeader size="small">
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">Earnings</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">Deductions</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">Net Salary</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payslips.map((slip) => (
                      <TableRow key={slip.id} hover>
                        <TableCell sx={{ fontWeight: 500 }}>{slip.month}</TableCell>
                        <TableCell>{new Date(slip.date).toLocaleDateString()}</TableCell>
                        <TableCell align="right">₹{totalEarnings(slip).toLocaleString()}</TableCell>
                        <TableCell align="right">₹{totalDeductions(slip).toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, color: '#667eea' }}>₹{slip.net.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip label={slip.status} color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Button size="small" startIcon={<ViewIcon />} onClick={() => handleViewPayslip(slip)}>View</Button>
                            <Button size="small" startIcon={<DownloadIcon />}>Download</Button>
                            <Button size="small" startIcon={<PrintIcon />}>Print</Button>
                          </Box>
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

      {/* Payslip Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>Payslip - {selectedPayslip?.month}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedPayslip && (
            <Box>
              {/* Company Header */}
              <Box sx={{ textAlign: 'center', mb: 3, pb: 2, borderBottom: '2px solid #eee' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>HRMS Company</Typography>
                <Typography variant="body2">Payslip for {selectedPayslip.month}</Typography>
              </Box>

              <Grid container spacing={3}>
                {/* Earnings */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Earnings</Typography>
                  {Object.entries(selectedPayslip.earnings).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      <Typography variant="body2">₹{value.toLocaleString()}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ pt: 1, borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <Typography variant="body2">Total Earnings</Typography>
                    <Typography variant="body2">₹{totalEarnings(selectedPayslip).toLocaleString()}</Typography>
                  </Box>
                </Grid>

                {/* Deductions */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Deductions</Typography>
                  {Object.entries(selectedPayslip.deductions).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      <Typography variant="body2">₹{value.toLocaleString()}</Typography>
                    </Box>
                  ))}
                  <Box sx={{ pt: 1, borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <Typography variant="body2">Total Deductions</Typography>
                    <Typography variant="body2">₹{totalDeductions(selectedPayslip).toLocaleString()}</Typography>
                  </Box>
                </Grid>

                {/* Net Salary */}
                <Grid item xs={12}>
                  <Box sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Net Salary (Take Home)</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>₹{selectedPayslip.net.toLocaleString()}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>Download PDF</Button>
          <Button variant="outlined" startIcon={<EmailIcon />}>Email to Me</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payslip;
