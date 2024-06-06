// components/Footer.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
  return (
    <Box mt={5} py={3} bgcolor="primary.main" color="white" textAlign="center">
      <Typography variant="body1">© 2024 Car Show. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
