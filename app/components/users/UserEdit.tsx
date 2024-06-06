import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { User } from "@/app/types";

const UserEdit = ({name, email}: User) => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);

export default UserEdit;
