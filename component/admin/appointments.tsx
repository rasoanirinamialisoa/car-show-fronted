// components/admin/appointments.tsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create, SelectInput } from 'react-admin';

export const AppointmentList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="carId" />
      <TextField source="name" />
      <TextField source="firstName" />
      <TextField source="email" />
      <TextField source="appointmentDate" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AppointmentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="carId" />
      <TextInput source="name" />
      <TextInput source="firstName" />
      <TextInput source="email" />
      <TextInput source="message" />
      <TextInput source="contact" />
      <TextInput source="appointmentDate" />
      <SelectInput source="status" choices={[
        { id: 'pending', name: 'Pending' },
        { id: 'validated', name: 'Validated' },
        { id: 'rejected', name: 'Rejected' },
        { id: 'archived', name: 'Archived' }
      ]} />
    </SimpleForm>
  </Edit>
);

export const AppointmentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="carId" />
      <TextInput source="name" />
      <TextInput source="firstName" />
      <TextInput source="email" />
      <TextInput source="message" />
      <TextInput source="contact" />
      <TextInput source="appointmentDate" />
      <SelectInput source="status" choices={[
        { id: 'pending', name: 'Pending' },
        { id: 'validated', name: 'Validated' },
        { id: 'rejected', name: 'Rejected' },
        { id: 'archived', name: 'Archived' }
      ]} />
    </SimpleForm>
  </Create>
);
