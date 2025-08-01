import React from 'react';
import { Typography, Box } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View and generate test reports based on completed samples.
      </Typography>
    </Box>
  );
};

export default Reports;