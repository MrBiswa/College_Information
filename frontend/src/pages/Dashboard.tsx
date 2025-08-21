import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@mui/material';
import {
  Science,
  People,
  Assignment,
  Description,
} from '@mui/icons-material';
import { apiClient } from '../api/client';
import { fetchTemplates } from '../api/templates';
import { fetchReports } from '../api/reports';

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
      const [samplesRes, employeesRes, templates, reports] = await Promise.all([
        apiClient.get('/samples'),
        apiClient.get('/samples/employee-workload'),
        fetchTemplates(),
        fetchReports(),
      ]);

      const samples = samplesRes.data;
      const employees = employeesRes.data;

      setStats({
        totalSamples: samples.length,
        pendingSamples: samples.filter((s: any) => s.status === 'submitted' || s.status === 'assigned').length,
        completedSamples: samples.filter((s: any) => s.status === 'completed').length,
        totalEmployees: employees.length,
        totalTemplates: templates.length,
        totalReports: reports.length,
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

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        <StatCard title="Total Samples" value={stats.totalSamples} icon={<Science />} color="#1976d2" />
        <StatCard title="Pending Samples" value={stats.pendingSamples} icon={<Assignment />} color="#ed6c02" />
        <StatCard title="Completed Samples" value={stats.completedSamples} icon={<Description />} color="#2e7d32" />
        <StatCard title="Active Employees" value={stats.totalEmployees} icon={<People />} color="#9c27b0" />
      </Box>

      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Typography color="text.secondary">No recent activity to display.</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            System Status
          </Typography>
          <Typography color="text.secondary">All systems operational.</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;