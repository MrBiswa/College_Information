import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  Science,
  People,
  Assignment,
  Description,
} from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface DashboardStats {
  totalSamples: number;
  pendingSamples: number;
  completedSamples: number;
  totalEmployees: number;
  totalTemplates: number;
  totalReports: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalSamples: 0,
    pendingSamples: 0,
    completedSamples: 0,
    totalEmployees: 0,
    totalTemplates: 0,
    totalReports: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // In a real implementation, you'd have a dashboard stats endpoint
      // For now, we'll make individual calls
      const [samplesRes, employeesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/samples`),
        axios.get(`${API_BASE_URL}/samples/employee-workload`),
      ]);

      const samples = samplesRes.data;
      const employees = employeesRes.data;

      setStats({
        totalSamples: samples.length,
        pendingSamples: samples.filter((s: any) => s.status === 'submitted' || s.status === 'assigned').length,
        completedSamples: samples.filter((s: any) => s.status === 'completed').length,
        totalEmployees: employees.length,
        totalTemplates: 0, // Would be fetched from templates endpoint
        totalReports: 0, // Would be fetched from reports endpoint
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome to the Lab Testing & Calibration Management System
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} {...({} as any)}>
          <StatCard
            title="Total Samples"
            value={stats.totalSamples}
            icon={<Science />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} {...({} as any)}>
          <StatCard
            title="Pending Samples"
            value={stats.pendingSamples}
            icon={<Assignment />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} {...({} as any)}>
          <StatCard
            title="Completed Samples"
            value={stats.completedSamples}
            icon={<Description />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} {...({} as any)}>
          <StatCard
            title="Active Employees"
            value={stats.totalEmployees}
            icon={<People />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6} {...({} as any)}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary">
              No recent activity to display.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} {...({} as any)}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Typography color="text.secondary">
              All systems operational.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;