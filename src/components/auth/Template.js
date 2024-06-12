// Template.js

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import Button from '../../libs/common/Button';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'



const TemplateDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-image: url(${sky_pastel_a}) ;
    background-size: cover;
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
`



const Template = ({children}) => {
    return (
        <TemplateDiv>

            <FormBoxDiv>
                <div>
                    <Link to="/" className="logo">DreamRoom</Link>
                </div>
                {children}
            </FormBoxDiv>

        </TemplateDiv>
    );
};

export default Template;