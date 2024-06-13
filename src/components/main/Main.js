import React from 'react';


import styled, { keyframes } from 'styled-components';
import night_pastel_a from "../../datas/images/night_pastel_a.jpg";
import { themeDatas } from '../../datas/themeDatas';

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
        background-position: center 30px;
    }
    50% {
        background-position: center 10px;
    }
    100% {
        background-position: center 30px;
    }
`;

const MainImgAni = styled.div`
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 750px;
    background-image: url(${night_pastel_a});
    background-size: cover;
    background-position: center 30px; /* 시작 위치를 중앙에서 20px 위로 */
    transform: scale(1.1); /* 이미지 크기 확대 */
    animation: ${imgAni} 2s ease-out forwards;
`;

const MainImgInfiniteAni = styled.div`
    position: absolute;
    z-index: 6;
    width: 100%;
    height: 750px;
    background-image: url(${night_pastel_a});
    background-size: cover;
    background-position: center 30px; /* 시작 위치를 중앙에서 30px 아래로 */
    transform: scale(1.1); /* 이미지 크기 확대 */
    opacity: 0;
    animation: ${updownAni} 4s ease-in-out infinite;
    animation-delay: 2s;
`;

//////





const Main = () => {



    const onAnimationEnd = () => {
        document.querySelector(".mainImgInfiniteAni").style.opacity = 1;
        // document.querySelector(".mainImgAni").style.opacity = 0;
    }

    return (
        <div>
            <FontContainer>

                <MainFontWrapper>
                    <HeadFont>메인 멘트 자리입니다</HeadFont>
                    <SubFont>캐치프레이즈 자리입니다</SubFont>
                </MainFontWrapper>

                <MainImgAni className="mainImgAni"
                            onAnimationEnd={onAnimationEnd} />
                <MainImgInfiniteAni className="mainImgInfiniteAni" />
                
            </FontContainer>
        </div>
    );
};

export default Main;
