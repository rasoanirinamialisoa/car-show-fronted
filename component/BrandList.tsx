// components/BrandList.tsx
import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';

const brands = ["Toyota", "Honda", "BMW", "Mercedes", "Audi", "Ford"];

const BrandList: React.FC = () => {
  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Popular Brands
      </Typography>
      <Grid container spacing={2}>
        {brands.map((brand) => (
          <Grid item xs={6} sm={4} md={2} key={brand}>
            <Button variant="outlined" fullWidth>
              <Link href={`/search?brand=${brand}`} passHref>
                {brand}
              </Link>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrandList;
