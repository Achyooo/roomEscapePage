// Main.js

import React, { useState, useEffect } from 'react';


import styled, { keyframes, css } from 'styled-components';
import night_pastel_a from "../../datas/images/night_pastel_a.jpg";

const FontContainer = styled.div`
    width: 100%;
    height: 750px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #666;
    word-break: keep-all;
    position: relative;
`;

const MainFontWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 10;
    ${({ smallerScreen }) =>
        smallerScreen &&
        css`
            margin-top: 200px;
            .headFont{
                font-size: 1.8rem;
            }
            .subFont{
                font-size: 1.2rem;
            }
        `
    }
`;

//////

const headFontAni = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const subFontAni = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-80px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const HeadFont = styled.div`
    font-size: 2.6rem;
    z-index: 10;
    opacity: 0;
    animation: ${headFontAni} 2s ease-out forwards;
    animation-delay: 0.5s;
`;

const SubFont = styled.div`
    padding-top: 30px;
    font-size: 1.4rem;
    font-style: italic;
    z-index: 10;
    opacity: 0;
    animation: ${subFontAni} 2s ease-out forwards;
    animation-delay: 1s;
`;

//////

const imgAni = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const updownAni = keyframes`
    0% {
        background-position: center 0px;
    }
    50% {
        background-position: center -20px;
    }
    100% {
        background-position: center 0px;
    }
`;

const MainImgAni = styled.div`
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 750px;
    background-image: url(${night_pastel_a});
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center 0px;
    animation: ${imgAni} 2s ease-out forwards;
    ${({ smallerScreen }) =>
        smallerScreen &&
        css`
            margin-top: 200px;
        `
    }
`;

const MainImgInfiniteAni = styled.div`
    position: absolute;
    z-index: 6;
    width: 100%;
    height: 750px;
    background-image: url(${night_pastel_a});
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center 0px;
    opacity: 0;
    animation: ${updownAni} 4s ease-in-out infinite;
    animation-delay: 2s;
    ${({ smallerScreen }) =>
        smallerScreen &&
        css`
            margin-top: 200px;
        `
    }
`;

//////





const Main = () => {

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


    const onAnimationEnd = () => {
        document.querySelector(".mainImgInfiniteAni").style.opacity = 1;
    }

    return (
        <div>
            <FontContainer>

                <MainFontWrapper smallerScreen={windowWidth < 950}>
                    <HeadFont className='headFont'>방 문을 열고, 꿈과 같은 세상 속으로</HeadFont>
                    <SubFont className='subFont'>" Open the door and Dream your world "</SubFont>
                </MainFontWrapper>

                <MainImgAni className="mainImgAni"
                            onAnimationEnd={onAnimationEnd}
                            smallerScreen={windowWidth < 950} />
                <MainImgInfiniteAni className="mainImgInfiniteAni"
                                    smallerScreen={windowWidth < 950} />
                
            </FontContainer>
        </div>
    );
};

export default Main;
