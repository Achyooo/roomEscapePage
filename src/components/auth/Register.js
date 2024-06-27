
// Register.js

import React, { memo } from 'react';
import Form from './Form';

import { connect } from 'react-redux';
import { change_mode, submit_register, submit_login, } from '../../modules/auth';


const Register = (props) => {

    const {mode,
            form,
            username,
            password,
            nickname,
            list,
            change_mode,
            submit_register,
            submit_login} = props

    return (
        <>
            <Form
                mode={mode}
                form={form}
                username={username}
                password={password}
                nickname={nickname}
                list={list}
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
            form: auth.register,
            username: auth.username,
            password: auth.password,
            nickname: auth.nickname,
            list: auth.list
        }
    ),

    {
        change_mode,
        submit_register,
        submit_login,
    }
)(memo(Register));
