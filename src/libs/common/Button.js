// Button.js

import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';



const SButton = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: #FFA8B2;
    background: #fff;
    border: 1px solid #FFA8B2;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    &:hover{
        color: #FFA8B2;
        background: #FFF9FA;
        border: 1px solid #FFA8B2;
    }
    ${props =>
        props.fullWidth &&
        css`
           padding-top: 0.75rem;
           padding-bottom: 0.75rem;
           width: 100%;
           font-size: 1.125rem;
        `}
    ${props =>
        props.BtnColor &&
        css`
            color: #fff;
            background: #FFB8C2;
            border: 1px solid #FFF;
            &:hover{
                color: #fff;
                background: #FFC8D2;
                border: 1px solid #FFF;
            }
        `}
    &:disabled{
        background: #e8e8e8;
        color: #c2c2c2;
        cursor: not-allowed;
    }
`


const StyledButton = styled.button`
    ${SButton}
`

const StyledLink = styled(Link)`
    ${SButton}
`





const Button = (props) => {
    return props.to ? (<StyledLink {...props} BtnColor={props.BtnColor ? 1 : 0}/>)
                    : (<StyledButton {...props}/>)
};

export default Button;