// Login.js

import React, { memo } from 'react';
import Form from './Form';

import { connect } from 'react-redux';
import { change_mode, submit_register, submit_login } from '../../modules/auth';


const Login = (props) => {

    const {mode,
            form,
            username,
            password,
            list,
            change_mode,
            submit_register,
            submit_login} = props;

    return (
        <>
            <Form
                mode={mode}
                form={form}
                list={list}
                username={username}
                password={password}
                change_mode={change_mode}
                submit_register={submit_register}
                submit_login={submit_login}
            />
        </>
    );
};




export default connect(
    ({auth})=>(
        {
            mode: auth.mode,
            form: auth.login,
            username: auth.username,
            password: auth.password,
            list: auth.list
        }
    ),

    {
        change_mode,
        submit_register,
        submit_login
    }
)(memo(Login));