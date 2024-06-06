import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';
import { User } from "@/app/types";

const UserList = ({name, email}: User) => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <EditButton/>
            <DeleteButton />
        </Datagrid>
    </List>
);

export default UserList;
