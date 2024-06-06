// components/admin/cars.tsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const CarList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="model" />
      <TextField source="price" />
      <TextField source="color" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const CarEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="brand" />
      <TextInput source="model" />
      <TextInput source="price" />
      <TextInput source="color" />
      <TextInput source="motorType" />
      <TextInput source="power" />
      <TextInput source="placeNumber" />
      <TextInput source="status" />
      <TextInput source="type" />
    </SimpleForm>
  </Edit>
);

export const CarCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="brand" />
      <TextInput source="model" />
      <TextInput source="price" />
      <TextInput source="color" />
      <TextInput source="motorType" />
      <TextInput source="power" />
      <TextInput source="placeNumber" />
      <TextInput source="status" />
      <TextInput source="type" />
    </SimpleForm>
  </Create>
);
