// components/AppointmentForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

const appointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().optional(),
  contact: z.string().min(1, "Contact is required"),
  appointmentDate: z.date().min(new Date(), "Appointment date must be in the future"),
});

type AppointmentFormInputs = z.infer<typeof appointmentSchema>;

const AppointmentForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AppointmentFormInputs>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit: SubmitHandler<AppointmentFormInputs> = data => {
    // Logique de sauvegarde de rendez-vous ici
    console.log(data);
    alert('Appointment booked successfully!');
  };

  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Book an Appointment
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box my={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        </Box>
        <Box my={2}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
          />
        </Box>
        <Box my={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        </Box>
        <Box my={2}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message ? errors.message.message : ''}
          />
        </Box>
        <Box my={2}>
          <TextField
            label="Contact"
            variant="outlined"
            fullWidth
            {...register('contact')}
            error={!!errors.contact}
            helperText={errors.contact ? errors.contact.message : ''}
          />
        </Box>
        <Box my={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Appointment Date"
              onChange={(date: Dayjs | null) => {
                setValue('appointmentDate', date ? date.toDate() : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!errors.appointmentDate}
                  helperText={errors.appointmentDate ? errors.appointmentDate.message : ''}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Book Appointment
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AppointmentForm;
