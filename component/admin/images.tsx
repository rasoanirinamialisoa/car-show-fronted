// components/admin/images.tsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const ImageList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="productId" />
      <TextField source="url" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ImageEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="productId" />
      <TextInput source="url" />
    </SimpleForm>
  </Edit>
);

export const ImageCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="productId" />
      <TextInput source="url" />
    </SimpleForm>
  </Create>
);
