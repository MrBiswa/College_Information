import React from 'react';
import { Typography, Box } from '@mui/material';

const TestTemplates: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Test Templates
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage master test templates and customize report formats.
      </Typography>
    </Box>
  );
};

export default TestTemplates;