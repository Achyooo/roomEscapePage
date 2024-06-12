// Header.js

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';


import Responsive from './Responsive';


import { connect } from 'react-redux';
import { change_mode, submit_register, submit_login, logout_id } from '../../modules/auth';

import Button from './Button';

import styled from 'styled-components';

const HeaderDiv = styled(Responsive)`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
    z-index: 999;
`

const WrapperDiv = styled.div`
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 25px;
    .logo{
        font-size: 1.7rem;
        font-weight: 800;
        letter-spacing: 2px;
        text-decoration: none;
        background: linear-gradient(to right, #B4E6FF, #E9E1FF, #FFC8D2);
        color: transparent;
        -webkit-background-clip: text;
    }
    .right{
        display: flex;
        align-items: center;
    }
`



const MenuUl = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    width: 560px;
`

const MenuLi = styled.li`
    font-size: 18px;
    /* font-weight: bold; */
    padding: 8px 26px;
`

const MenuLink = styled(Link)`
    text-decoration: none;
    color: black;
    transition: all 0.4s;
    &:hover{
        transform: translateY(-3px);
        cursor: pointer;
        &:nth-child(1){
            color: #A4D9FF;
        }
        &:nth-child(2){
            color: #C9C1FF;
        }
        &:nth-child(3){
            color: #C9C1FF;
        }
        &:nth-child(4){
            color: #FFA8B2;
        }
    }
`


const UserDiv = styled.div`
    font-weight: 800;
    margin-right: 1rem;
    white-space: nowrap;
    /* word-break: keep-all; */
`

const SpanStyle = styled.span`
    color: #FFA8B2;
    padding-right: 2px;
`



const Header = (props) => {

    const {mode,
           form,
           username,
           loginUsername,
           loginNickname,
           change_mode,
           submit_register,
           submit_login,
           logout_id} = props


    const navi = useNavigate();
    const loca = useLocation();

    
    const onClickLogout = () => {
        logout_id();
        alert("로그아웃 되었습니다.");
        // 글쓰기페이지에서 로그아웃할경우 이전으로 돌아가게 해야함
        if(loca.pathname === '/write'){
            navi(-1)
        }
    }


    const onClickLogin = () => {
        change_mode("login");
    }

    const onClickRegister = () => {
        change_mode("register");
    };


    // console.log(user);


    return (
        <>
        <HeaderDiv>

            <WrapperDiv>

                <Link to="/" className="logo">DreamRoom</Link>


                <div>
                    <MenuUl>
                        <MenuLink to="/theme"><MenuLi>테마</MenuLi></MenuLink>
                        <MenuLink to="/reservation"><MenuLi>예약</MenuLi></MenuLink>
                        <MenuLink to="/reservationLook"><MenuLi>예약조회/취소</MenuLi></MenuLink>
                        <MenuLink to="/review"><MenuLi>후기</MenuLi></MenuLink>
                    </MenuUl>
                </div>



                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignContent:"center"}}>
                    <div className="right">
                    {loginUsername ? (
                            <>
                                <UserDiv><SpanStyle>{loginNickname}</SpanStyle> 님 환영합니다</UserDiv>
                                <Button onClick={onClickLogout}
                                        style={{whiteSpace:"nowrap"}}
                                        BtnColor>로그아웃</Button>
                            </>
                        ) : (
                            <>
                                <Button to="/login"
                                        onClick={onClickLogin}
                                        style={{marginRight:"15px", whiteSpace:"nowrap"}}
                                        BtnColor>로그인
                                </Button>
                                
                                <Button to="/register"
                                        onClick={onClickRegister}
                                        style={{whiteSpace:"nowrap"}}
                                        BtnColor>회원가입
                                </Button>
                            </>
                        )}
                    </div>
                </div>

            </WrapperDiv>

        </HeaderDiv>
        <div style={{height:"4rem"}}></div>
        </>
    );
};

export default connect(
    ({auth})=>(
        {
            mode: auth.mode,
            form: auth.login,
            username: auth.username,
            loginUsername: auth.loginUsername,
            loginNickname: auth.loginNickname
        }
    ),

    {
        change_mode,
        submit_register,
        submit_login,
        logout_id

    }
)(Header);