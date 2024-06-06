import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { User } from "@/app/types";


const UserCreate = ({name, email}: User) => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);

export default UserCreate;