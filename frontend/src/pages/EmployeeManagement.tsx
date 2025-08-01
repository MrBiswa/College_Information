import React from 'react';
import { Typography, Box } from '@mui/material';

const EmployeeManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage lab employees, their testing categories, and workload.
      </Typography>
    </Box>
  );
};

export default EmployeeManagement;