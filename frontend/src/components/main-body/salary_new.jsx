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
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
} from '@mui/material';
import { Download as DownloadIcon, Visibility as ViewIcon, Payment as PaymentIcon } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Salary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    bankAccount: '1234567890',
  };

  const salaryHistory = [
    { month: 'Jan', earnings: 67500, deductions: 14750, net: 52750 },
    { month: 'Feb', earnings: 67500, deductions: 14750, net: 52750 },
    { month: 'Mar', earnings: 67500, deductions: 14750, net: 52750 },
    { month: 'Apr', earnings: 68000, deductions: 15000, net: 53000 },
    { month: 'May', earnings: 68000, deductions: 15000, net: 53000 },
    { month: 'Jun', earnings: 68000, deductions: 15000, net: 53000 },
  ];

  const payslips = [
    { id: 1, month: 'June 2026', date: '2026-06-30', earnings: 68000, deductions: 15000, net: 53000, status: 'Paid' },
    { id: 2, month: 'May 2026', date: '2026-05-31', earnings: 68000, deductions: 15000, net: 53000, status: 'Paid' },
    { id: 3, month: 'April 2026', date: '2026-04-30', earnings: 68000, deductions: 15000, net: 53000, status: 'Paid' },
    { id: 4, month: 'March 2026', date: '2026-03-31', earnings: 67500, deductions: 14750, net: 52750, status: 'Paid' },
  ];

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        {/* Salary Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Base Salary</Typography>
              <Typography variant="h5">₹{currentSalary.baseSalary.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Total Earnings</Typography>
              <Typography variant="h5">₹{currentSalary.totalEarnings.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Total Deductions</Typography>
              <Typography variant="h5">₹{currentSalary.totalDeductions.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>Net Salary</Typography>
              <Typography variant="h5">₹{currentSalary.netSalary.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Salary Breakdown */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader title="Current Month Breakdown" />
            <CardContent>
              {[
                { label: 'Base Salary', amount: currentSalary.baseSalary },
                { label: 'Dearness Allowance', amount: currentSalary.dearness },
                { label: 'House Rent Allowance', amount: currentSalary.houseRent },
                { label: 'Medical Allowance', amount: currentSalary.medical },
              ].map((item) => (
                <Box key={item.label} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{item.amount.toLocaleString()}</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={(item.amount / currentSalary.totalEarnings) * 100} />
                </Box>
              ))}
              <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #eee' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 600 }}>Total Earnings</Typography>
                  <Typography sx={{ fontWeight: 600 }}>₹{currentSalary.totalEarnings.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Salary Trend */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader title="6-Month Salary Trend" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Legend />
                  <Bar dataKey="net" fill="#667eea" name="Net Salary" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Payslips */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardHeader
              title="Payslip History"
              subheader="Download or view your payslips"
            />
            <CardContent>
              <TableContainer component={Paper} sx={{ borderRadius: 1, maxHeight: '500px', overflow: 'auto' }}>
                <Table stickyHeader>
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
                        <TableCell>{slip.month}</TableCell>
                        <TableCell>{new Date(slip.date).toLocaleDateString()}</TableCell>
                        <TableCell align="right">₹{slip.earnings.toLocaleString()}</TableCell>
                        <TableCell align="right">₹{slip.deductions.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>₹{slip.net.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip label={slip.status} color="success" size="small" />
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<ViewIcon />} onClick={() => handleViewPayslip(slip)}>View</Button>
                          <Button size="small" startIcon={<DownloadIcon />}>Download</Button>
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Payslip Details - {selectedPayslip?.month}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedPayslip && (
            <Box>
              <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Earnings</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Total Earnings</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{selectedPayslip.earnings.toLocaleString()}</Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Deductions</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">Total Deductions</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{selectedPayslip.deductions.toLocaleString()}</Typography>
                </Box>
              </Box>
              <Box sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 600 }}>Net Salary</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#667eea' }}>₹{selectedPayslip.net.toLocaleString()}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Salary;
