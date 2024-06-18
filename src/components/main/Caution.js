import React, { useEffect, useState } from 'react';

import styled, { css } from 'styled-components';

import clock_icon from './icons/clock_icon.png';
import no_photo from './icons/no_photo.png';
import chat_bubble_icon from './icons/chat_bubble_icon.png';
import no_knife from './icons/no_knife.png';



const Container = styled.div`
    width: 100%;
    height: 570px;
    background-color: #ddd;
    margin-bottom: 150px;
    /* 950px 이하 */
    ${(props)=>
        props.smallScreen &&
        css`
            height: 1000px;
        `
    }
    /* 700px 이하 */
    ${(props)=>
        props.smallererScreen &&
        css`
            height: 1700px;
        `
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h1{
        padding: 10px 0px 26px 0px;
        font-size: 3rem;
    }
    .cautionsWrapper{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        transition: all 1s;
        /* 2000px 이상 환경 */
        ${(props)=>
            props.largeScreen &&
            css`
                width: 1800px;
            `
        }
        /* 2000px 미만 환경 */
        ${(props)=>
            props.middleScreen &&
            css`
                justify-content: space-between;
                width: 1400px;
            `
        }
        /* 1200px 이하 환경 */
        ${(props)=>
            props.smallScreen &&
            css`
                width: 650px;
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 60px;
            `
        }
        /* 700px 이하 환경 */
        ${(props)=>
            props.smallererScreen &&
            css`
                width: 290px;
                grid-gap: 40px;
            `
        }
        .oneCaution{
            background-color: #fff;
            width: 250px;
            height: 300px;
            padding: 34px 20px 0px 20px;
            border-radius: 20px;
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
            img {
                width: 150px;
            }
            h2 {
                word-break: keep-all;
            }
            div {
                color: #555;
                word-break: keep-all;
            }
        }
        .oneCaution.show{
            opacity: 1;
            transform: translateX(0);
        }
    }
    ${(props) =>
        props.smallScreen &&
        css`
        .cautionsWrapper {
            .oneCaution:nth-child(1),
            .oneCaution:nth-child(2) {
                grid-row: 1;
            }
            .oneCaution:nth-child(3),
            .oneCaution:nth-child(4) {
                grid-row: 2;
            }
        }
    `}
    ${(props) => 
        props.smallererScreen &&
        css`
        .cautionsWrapper {
            .oneCaution:nth-child(1) {
                grid-row: 1;
            }
            .oneCaution:nth-child(2) {
                grid-row: 2;
            }
            .oneCaution:nth-child(3) {
                grid-row: 3;
            }
            .oneCaution:nth-child(4) {
                grid-row: 4;
            }
        }
    `}
`



const Caution = () => {


    // 2000px 이상일때 넓이 제한 주기
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


    // 뷰 이벤트
    useEffect(()=>{

        const observer = new IntersectionObserver(
            (etrs) => {
                etrs.forEach((etr, idx) => {
                    if(etr.isIntersecting){
                        setTimeout(()=>{
                            etr.target.classList.add("show"); // 클래스 추가
                        }, idx*200)
                    } else {
                        setTimeout(()=>{
                            etr.target.classList.remove("show");
                        }, idx*200)
                    }
                });
            },
            { threshold: 0.5 } // 노출 정도
        );

        const oneCautions = document.querySelectorAll(".oneCaution");
        oneCautions.forEach((el)=>observer.observe(el));

        return () => {
            oneCautions.forEach((el)=>observer.unobserve(el));
        }

    },[])



    return (
        <Container smallScreen={windowWidth < 1360}
                   smallererScreen={windowWidth < 700}>

            <Wrapper largeScreen={windowWidth > 2000}
                     middleScreen={windowWidth <= 2000}
                     smallScreen={windowWidth < 1360}
                     smallererScreen={windowWidth < 700}>

                <h1>C A U T I O N</h1>
                
                
                <div className='cautionsWrapper'>
                    <div className='oneCaution'>
                        <img src={clock_icon} alt="15분 전 도착"></img>
                        <h2>15분 전 도착</h2>
                        <div>안내와 확인을 위해<br/>예약 시간 15분 전에 도착해주세요</div>
                    </div>
                    <div className='oneCaution'>
                        <img src={no_photo} alt="사진 촬영 금지"></img>
                        <h2>사진 촬영 금지</h2>
                        <div>테마 내에서의<br/>사진 촬영을 금지합니다.</div>
                    </div>
                    <div className='oneCaution'>
                        <img src={chat_bubble_icon} alt="스포일러 금지"></img>
                        <h2>스포일러 금지</h2>
                        <div>더 큰 재미를 위하여<br/>비밀을 지켜주세요.</div>
                    </div>
                    <div className='oneCaution'>
                        <img src={no_knife} alt="위험 물품 반입 금지"></img>
                        <h2>위험 물품 반입 금지</h2>
                        <div>모든 고객님들의 안전을 위해<br/>위험한 물건의 반입은 금지됩니다.</div>
                    </div>
                </div>

            </Wrapper>

        </Container>
    );
};

export default Caution;