// components/PinnedCars.tsx
import React from 'react';
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Link from 'next/link';

const pinnedCars = [
  {
    id: 1,
    name: "Toyota Corolla",
    description: "A reliable and fuel-efficient sedan.",
    imageUrl: "/images/corolla.jpg"
  },
  {
    id: 2,
    name: "Honda Civic",
    description: "A sporty and stylish compact car.",
    imageUrl: "/images/civic.jpg"
  },
  // Ajoutez plus de voitures ici
];

const PinnedCars: React.FC = () => {
  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Featured Cars
      </Typography>
      <Grid container spacing={2}>
        {pinnedCars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={car.imageUrl}
                alt={car.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {car.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {car.description}
                </Typography>
                <Button size="small" color="primary">
                  <Link href={`/car/${car.id}`} passHref>
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PinnedCars;
