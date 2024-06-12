import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled, { css, keyframes } from 'styled-components';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../datas/themeDatas'

import StarRating from './StarRating';



//

const appearAni = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
    display: flex;
    justify-content: space-between;
    animation: ${appearAni} 0.5s ease-out forwards;
`

const OneThemePlace = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`


// hover 여깄음
const ImgStyle = styled.img`
    width: 300px;
    height: 424px;
    object-fit: cover;
    box-shadow: 7px 7px 9px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    opacity: 0;
    transform: translateX(-50px);
    ${({ inView }) =>
        inView &&
        css`
            opacity: 1;
            transform: translateX(0);
        `}
`;

const ReallyOneThemePlace = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
    padding: 110px 0px;
    &:first-child{
        padding-top: 30px;
    }
    &:last-child{
        border-bottom: none;
        padding-bottom: 30px;
    }
`

const InfoTextPlace = styled.div`
    width: 650px;
    padding-left: 50px;
    position: relative;
`

const ThemeTitleStyle = styled.div`
    font-size: 2rem;
    font-weight: bold;
    line-height: 40px;
    color: #A4D9FF;
    margin-bottom: 20px;
`

const SubInfosPlace = styled.div`
    display: flex;
    border-top: 5px double #ddd;
    padding-top: 30px;
`

const SmallInfoLeft = styled.div`
    width: 325px;
`

const SmallInfoRight = styled.div`
    width: 325px;
`

const SmallInfoLine = styled.div`
    margin-bottom: 20px;
`

const SmallTitleSpanStyle = styled.span`
    background-color: #B4E6FF;
    padding: 3px 15px;
    margin-right: 10px;
    color: white;
    font-weight: bold;
    border-radius: 4px;
`


const DescWrapper = styled.div`
    margin-bottom: 100px;
`


const ReservationButton = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #A4D9FF;
    border: 1px solid white;
    width: 270px;
    height: 50px;
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    transition: all 0.4s;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
        background-color: white;
        color: #A4D9FF;
        border: 1px solid #A4D9FF;
    }
`




const Theme = () => {


    // console.log(themeDatas[0].desc[0]);

    const navi = useNavigate();
    const [inView, setInView] = useState(new Array(themeDatas.length).fill(false));

    // console.log(new Array(themeDatas.length).fill("엥"))

    const onclickReservation = (e) => {
        const themeIndex = parseInt(e.target.dataset.index);
        console.log("클릭테스트");
        console.log(themeDatas[themeIndex]);
        navi(`/reservation?themeIndex=${themeIndex}`)
    }



    // 타켓 요소가 화면에 노출되었는지 판단, IntersectionObserver
    useEffect(() => {

        const options = { threshold: 0.2 };
        const callback = (entries) => {
            entries.forEach((entry) => {
                setInView((prev) => {
                    const newInView = [...prev];
                    // console.log(newInView) // 뷰에 들어오면 true => ex) [true, false, false]
                    newInView[entry.target.dataset.index] = entry.isIntersecting;
                    // isIntersecting = 관찰 대상이 현재 루트 안에 포함되어 있는지의 여부 확인
                    // console.log("그 인덱스 = " + entry.target.dataset.index)
                    // console.log("루트안에포함되어잇니? = " + entry.isIntersecting);
                    return newInView;
                });
            })
        }

        const observer = new IntersectionObserver(callback, options);


        const elements = document.querySelectorAll('.theme-img');
        // console.log(elements);
        elements.forEach((el) => observer.observe(el)); // 이미지 관찰

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            // 타겟 요소를 관찰할 필요 없다면 observer에서 끊기
        };

    }, []);



    return (
        <div>

            <BodyWrapper>

                <OneThemePlace>

                    
                        {themeDatas.map((obj, idx) => (
                            <ReallyOneThemePlace key={idx}>


                                    <ImgStyle src={obj.poster}
                                              alt="그림이이왜안보일까"
                                              className="theme-img"
                                              data-index={idx}
                                              inView={inView[idx]} />
                                    
                                    <InfoTextPlace>
                                        <ThemeTitleStyle>{obj.name}</ThemeTitleStyle>

                                        <SubInfosPlace>
                                            <SmallInfoLeft>
                                                <SmallInfoLine><SmallTitleSpanStyle>장르</SmallTitleSpanStyle> {obj.genre}</SmallInfoLine>
                                                <SmallInfoLine><SmallTitleSpanStyle>시간</SmallTitleSpanStyle> {obj.time}</SmallInfoLine>
                                            </SmallInfoLeft>
                                            <SmallInfoRight>
                                                <SmallInfoLine><SmallTitleSpanStyle>인원</SmallTitleSpanStyle> {obj.numOfPeople}명</SmallInfoLine>
                                                <SmallInfoLine><SmallTitleSpanStyle>난이도</SmallTitleSpanStyle>
                                                    <StarRating starNum={obj.difficulty}></StarRating>
                                                </SmallInfoLine>
                                            </SmallInfoRight>
                                        </SubInfosPlace>

                                        <DescWrapper>
                                            {obj.desc.map((descItem, i) => (
                                                <p key={i}>{descItem}</p>
                                            ))}
                                        </DescWrapper>

                                        <ReservationButton onClick={onclickReservation}
                                                           data-index={idx}>
                                                           예약하기
                                        </ReservationButton>

                              
                                    </InfoTextPlace>

                            </ReallyOneThemePlace>
                        ))}
                    
    
                </OneThemePlace>

            </BodyWrapper>

        </div>
    );
};

export default Theme;