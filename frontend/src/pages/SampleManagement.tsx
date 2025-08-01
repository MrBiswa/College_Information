import React from 'react';
import { Typography, Box } from '@mui/material';

const SampleManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sample Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage test samples, assign employees, and track progress.
      </Typography>
    </Box>
  );
};

export default SampleManagement;