import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import styled, { keyframes, css } from 'styled-components';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../datas/themeDatas'



//////////////

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
    box-sizing: border-box;
    padding: 70px 90px;
    border: 1px solid #c0c0c0;
    animation: ${appearAni} 0.5s ease-out forwards;
    ${(props)=>
        props.smallScreen && 
        css`
            width: 660px;
            align-items: center;
        `
    }
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 350px;
            margin: 50px auto;
            padding: 60px 40px;
        `
    }
    .headTitle{
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 100px;
        color: #C9C1FF;
        ${(props)=>
            props.smallScreen && 
            css`
                text-align: center;
            `
        }
        ${(props)=>
            props.smallerScreen && 
            css`
                font-size: 1.6rem;
                margin-bottom: 60px;
            `
        }
    }
`

const InfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    /* 610px 이하에서 */
    ${(props)=>
        props.smallerScreen && 
        css`
            margin-top: 74px;
            margin-left: 10px;
        `
    }
    .bundle{
        margin-bottom: 80px;
        .bundle-oneLine{
            display: flex;
            padding-bottom: 40px;
            /* 610px 이하에서 라인 하나 밑 패딩 */
            ${(props)=>
                props.smallerScreen && 
                css`
                    font-size: 1rem;
            `
        }
            .oneLine-title{
                width: 150px;
                color: #afafaf;
                /* 610px 이하에서 세부 제목 */
                ${(props)=>
                    props.smallerScreen && 
                    css`
                        width: 120px;
                        font-size: 1rem;
                    `
                }
            }
            .oneLine-input{
                width: 250px;
                font-size: 17px;
                padding: 3px 6px;
                height: 30px;
                /* 610px 이하에서 세부 내용 (input) */
                ${(props)=>
                    props.smallerScreen && 
                    css`
                        font-size: 0.9rem;
                        width: 140px;
                        height: 20px;
                    `
                }
            }
        }
    }
`



const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    button{
        margin-bottom: 0px;
        width: 600px;
        height: 54px;
        background-color: #C9C1FF;
        border: 1px solid #C9C1FF;
        color: #fff;
        border-radius: 4px;
        font-size: 1.3rem;
        font-weight: bold;
        transition: all 0.4s;
        cursor: pointer;
        &:hover{
            background-color: #fff;
            border: 1px solid #C9C1FF;
            color: #C9C1FF;
        }
    }
`

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    span{
        color: red;
        margin-top: 30px;
    }
`




const ReservationLook = (props) => {

    const { clientPhone,
            clientPw,
            numOfPeople,
            theme,
            date,
            time,
            perCost,
            totalCost,
            list } = props;

    const { submit_reservation_login } = props;


    const [error, setError] = useState();
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
    

    const navi = useNavigate();

    console.log(list)


    // 예약 조회 제출
    const onSubmit = (e) => {

        e.preventDefault();

        if (e.target.clientName.value === '' || e.target.clientPhone.value === '' || e.target.clientPw.value === '') {
            setError("※ 정보를 모두 입력해주세요. ※");
        } else {

            let wantToLook = list.filter((item)=>item.clientName===e.target.clientName.value &&
                                                 item.clientPhone===e.target.clientPhone.value &&
                                                 item.clientPw===e.target.clientPw.value)
            
            // 보려는 배열 확인
            console.log("보고싶은배열: ", wantToLook)
            // console.log("그 비번: ", wantToLook[0].clientPw)

            if (wantToLook.length > 0){
                submit_reservation_login(
                    e.target.clientName.value,
                    e.target.clientPhone.value,
                    e.target.clientPw.value,
                );
                // 와 짱길다
                navi(`/reservationLookSuccess?theme=${wantToLook[0].theme}&date=${wantToLook[0].date}&time=${wantToLook[0].time}&clientName=${e.target.clientName.value}&clientPhone=${e.target.clientPhone.value}&person=${wantToLook[0].numOfPeople}&totalCost=${wantToLook[0].totalCost}&`);
            } else {
                alert("예약 정보가 없습니다. 예약 당시 입력했던 정보를 정확히 입력해주세요.");
            }
        }

    }



    return (
        <div>

            <BodyWrapper smallScreen={windowWidth < 1050}
                         smallerScreen={windowWidth < 660}>

                <div className="headTitle">예약 조회하기</div>


                <form onSubmit={onSubmit}>
                

                {/* 정보들 */}
                <div style={{fontSize:"18px"}}>

                    <InfoWrapper smallScreen={windowWidth < 1050}
                                 smallerScreen={windowWidth < 660}>

                        <div className='bundle'>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>예약자 본명</div>
                                <input className='oneLine-input'
                                       placeholder='이름을 입력하세요'
                                       autoComplete='clientName'
                                       name="clientName"></input>
                            </div>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>연락처</div>
                                <input className='oneLine-input'
                                       placeholder="'-' 제외하여 입력"
                                       autoComplete='clientPhone'
                                       name="clientPhone"></input>
                            </div>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>예약 확인 번호</div>
                                <input className='oneLine-input'
                                       placeholder='예약 조회용 비밀번호'
                                       autoComplete='clientPw'
                                       name="clientPw"></input>
                            </div>
                        </div>
                    </InfoWrapper>

                </div>


                {/* 조회버튼 */}
                <ButtonWrapper smallScreen={windowWidth < 1050}
                               smallerScreen={windowWidth < 660}>
                    <button type="submit">조회하기</button>
                </ButtonWrapper>

                <ErrorWrapper>
                    <span>{error}</span>
                </ErrorWrapper>


                </form>

            </BodyWrapper>


        </div>
    );
};

export default ReservationLook;