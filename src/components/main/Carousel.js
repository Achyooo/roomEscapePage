import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import StarRating from '../theme/StarRating';
import { themeDatas } from '../../datas/themeDatas';
import styled, { css } from 'styled-components';

// Slick 슬라이더 환경설정
const defaultSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
};


// Theme와 ─────────
const TitleAndLine = styled.div`
    margin-top: 200px;
    .line {
        border-top: 1px solid #555;
        position: relative;
        margin-bottom: 100px;
        p {
            position: absolute;
            top: -38px;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            margin-bottom: 50px;
            color: #555;
            background-color: #fff;
            padding: 0px 30px;
        }
    }
`

// 카로셀 컨테이너 스타일
const CarouselContainer = styled.div`
    max-width: 1200px;
    margin: 0px auto;
    margin-bottom: 120px;
    text-align: center;
    color: #444;
    transition: all 1s;
    opacity: 0;
    ${({ inView }) =>
        inView &&
        css`
            opacity: 1;
        `}
`;

// 카로셀 칸 하나
const CarouselDiv = styled.div`
    display: flex !important;
    flex-direction: column;
    justify-content: center !important;
    align-items: center !important;
    width: auto !important;
    img {
        display: block;
        margin: auto;
        width: 300px;
        height: 424px;
        object-fit: cover;
    }
    .descArea {
        width: 300px;
        padding: 24px;
    }
    .itemName{
        font-size: 1.5rem;
    }
    .itemSecond {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        .itemStar{
            position: static !important;
            margin-left: 0 !important;
        }  
    }
`;

const carouselList = [ themeDatas[0], themeDatas[1], themeDatas[2] ];





const Carousel = () => {

    const [inView, setInView] = useState(false); // view 안에 들어왔는지 상태
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [settings, setSettings] = useState(defaultSettings); // 카로셀 환경설정 상태

    // 넓이에 따른 크기 조정...
    useEffect(()=>{
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    },[])

    // 넓이 950픽셀 미만일 때 카로셀 환경설정 변경
    useEffect(()=>{
        if (windowWidth < 950){
            setSettings({
                ...defaultSettings,
                slidesToShow: 1
            });
        } else {
            setSettings(defaultSettings);
        }
    },[windowWidth])


    // 뷰에 들어오면 실행할 함수
    useEffect(()=>{
        const observer = new IntersectionObserver(
            (etrs) => {
                etrs.forEach((etr) => {
                    if(etr.isIntersecting){
                        setInView(true);
                    }else{
                        setInView(false);
                    }
                });
            },
            { threshold: 0.5 } // 노출 정도
        );

        const container = document.querySelector(".themeContainer") // 컨테이너 클래스 선택
        if(container){
            observer.observe(container); // 관찰 시작
        }

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    },[]);


    
    


    return (
        <>

            <TitleAndLine>
                <div className='line'>
                    <p>Themes</p>
                </div>
            </TitleAndLine>

                
            <CarouselContainer className='themeContainer'
                               inView={inView}>

                <Slider {...settings}>
                    {carouselList.map((item, idx) => (
                        <CarouselDiv key={idx}>
                            <img src={item.poster}
                                alt={`안녕이건${idx}번째그림이고요왜안보이징`} />
                            <div className='descArea'>
                                <div className='itemName'>{item.name}</div>
                                <div className='itemSecond'>
                                    <span>{item.genre}</span>
                                    <span> │ </span>
                                    <StarRating className="itemStar" starNum={item.difficulty}/>
                                </div>
                            </div>
                        </CarouselDiv>
                    ))}
                </Slider>

            </CarouselContainer>
        </>
    );
};

export default Carousel;
