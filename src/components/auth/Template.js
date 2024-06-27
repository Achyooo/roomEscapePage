// Template.js
// 로그인, 회원가입 틀의...대장...?

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'



const TemplateDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-image: url(${sky_pastel_a}) ;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const FormBoxDiv = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 360px;
    background: white;
    border-radius: 10px;
    .logo{
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        letter-spacing: 2px;
        font-size: 1.4rem;
        font-weight: 800;
        text-decoration: none;
        background: linear-gradient(to right, #A4D6FF, #A4D6FF, #D9D1FF, #FFB8C2, #FFB8C2);
        color: transparent;
        -webkit-background-clip: text;
    }
    /* 500px 미만 환경 */
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 290px
        `
    }
`



/////




const Template = ({children}) => {

    // 반응형
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(()=>{
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    },[])



    return (
        <TemplateDiv>

            <FormBoxDiv smallerScreen={windowWidth < 500}>
                <div>
                    <Link to="/" className="logo">DreamRoom</Link>
                </div>
                {children}
            </FormBoxDiv>

        </TemplateDiv>
    );
};

export default Template;