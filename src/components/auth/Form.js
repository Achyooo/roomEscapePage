// Form.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../libs/common/Button';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';



const FormDiv = styled.div`
    h3{
        margin: 0;
        color: ${palette.Gray[8]};
        margin-bottom: 1rem;
    }
`

const InputStyle = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.Gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color: #FF8892;
        border-bottom: 1px solid ${palette.Gray[7]};
    }
    &+&{
        margin-top: 1rem;
    }
`

const ButtonStyle = styled(Button)`
    margin-top: 1rem;
`

const FooterDiv = styled.div`
    margin-top: 2rem;
    text-align: right;
    a{
        color: ${palette.Gray[6]};
        text-decoration: underline;
        &:hover{
            color: ${palette.Gray[9]};
        }
    }
`

const ErrorStyle = styled.div`
    color: red;
    padding-top: 10px;
`




const textType = {
    login: "로그인",
    register: "회원가입"
}



const Form = (props) => {

    const navigate = useNavigate();
    // const loaction = useLocation();


    const { mode,
            list,
            change_mode,
            submit_register,
            submit_login } = props;

    const [error, setError] = useState()

    const text = textType[mode]

    // console.log(list)


    const onclick = (e) => {
        if(e.target.innerHTML === "로그인"){
            change_mode("login");
        }else{
            change_mode("register");
        }
    }



    const onsubmit = (e) => {

        e.preventDefault();

        // 이건 회원가입
        if(mode==="register"){
            // console.log(e.target.username.value)
            // console.log(e.target.password.value)
            // console.log(e.target.passwordConfirm.value)
            // console.log(e.target.nickname.value)

            if(e.target.username.value === '' || e.target.password.value === '' || e.target.nickname.value === ''){
                setError("정보를 모두 입력하세요.")
            }else{
                const exist = list.find((item)=>item.username===e.target.username.value)
                console.log(exist)
                // 있:{username: 'asdf', password: '1234'} 없:undefined
                if(exist){
                    // true일때 (아무튼 false취급하는것들 빼고 뭐가 있으면 트루임)
                    setError("이미 존재하는 아이디입니다.")
                }else{
                    if(e.target.password.value === e.target.passwordConfirm.value){
                        submit_register(e.target.username.value, e.target.password.value, e.target.nickname.value)
                        alert("회원가입이 완료되었습니다.")
                        navigate('/login')
                        change_mode('login')

                    }else{
                        setError("비밀번호 확인이 일치하지 않습니다.")
                    }
                }
            }
            
        
        // 이건 로그인
        }else{
            // console.log(e.target.username.value)
            // console.log(e.target.password.value)

            let newList = list.filter((item)=>(item.username === e.target.username.value && item.password === e.target.password.value))
        
            console.log(newList)

            if(e.target.username.value==='' || e.target.password.value===''){
                setError("정보를 입력하세요.")
            }else{
                if(newList.length > 0){
                    submit_login(e.target.username.value, e.target.password.value)
                    navigate('/')
                }else{
                    setError("정보가 없습니다.")
                }
            }
        }
    }



    return (
        <FormDiv>
            
            <h3> {text} </h3>

            <form onSubmit={onsubmit}>
                <InputStyle
                        type="text"
                        autoComplete='username'
                        name="username"
                        placeholder='아이디'
                />

                <InputStyle
                        type="password"
                        autoComplete='new-password'
                        name="password"
                        placeholder='비밀번호'
                />

                {mode==='register' && (
                    <InputStyle
                            type="password"
                            autoComplete='new-password'
                            name="passwordConfirm"
                            placeholder='비밀번호 확인'
                    />     
                )}

                {mode==='register' && (
                    <InputStyle
                            type="text"
                            autoComplete='nickname'
                            name="nickname"
                            placeholder='사용할 닉네임'
                    />
                )}


                <ButtonStyle type="submit" BtnColor fullWidth>{text}</ButtonStyle>
            </form>



            <ErrorStyle>{error}</ErrorStyle>


            <FooterDiv onClick={onclick}>
                {mode==='login' ? (<Link to='/register'>회원가입</Link>)
                                : (<Link to='/login'>로그인</Link>)
                }
            </FooterDiv>

        </FormDiv>
    );
};

export default Form;