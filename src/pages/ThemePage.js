import React, { useState, useEffect } from 'react';

import styled, { css, keyframes } from 'styled-components';
import sky_pastel_a from '../datas/images/sky_pastel_a.jpg'

import Header from '../libs/common/Header';
import Theme from '../components/theme/Theme';
import Footer from '../libs/common/Footer';


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
    ${(props)=>
        props.smallerScreen &&
        css`
            margin-top: 100px;
        `
    }
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

    // 950px 미만 넓이제한
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
        <>
            <Header></Header>

            <TitleBox smallerScreen={windowWidth < 950}>
                <BigTitle>테마 소개</BigTitle>
                <SmallTitle>Theme Information</SmallTitle>
            </TitleBox>

            <Theme></Theme>

            <Footer></Footer>
        </>
    );
};

export default ThemePage;