import React from 'react';

import styled, { css, keyframes } from 'styled-components';
import sky_pastel_a from '../datas/images/sky_pastel_a.jpg'

import Header from '../libs/common/Header';
import Theme from '../components/theme/Theme';
import Footer from '../libs/common/Footer';




const updownAni = keyframes`
    0% {
        background-position: center;
    }
    50% {
        background-position: center -470px;
    }
    100% {
        background-position: center;
    }
`;

const TitleBox = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${sky_pastel_a});
    background-position: center;
    background-size: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 50px;
    /* animation: ${updownAni} 4s ease-in-out infinite; */
`

const BigTitle = styled.div`
    font-size: 1.7rem;
    color: #666;
`

const SmallTitle = styled.div`
    font-size: 1.1rem;
    color: #666;
`


const ThemePage = () => {
    return (
        <div>
            <Header></Header>

            <TitleBox>
                <BigTitle>테마 소개</BigTitle>
                <SmallTitle>Theme Information</SmallTitle>
            </TitleBox>

            <Theme></Theme>

            <Footer></Footer>
        </div>
    );
};

export default ThemePage;