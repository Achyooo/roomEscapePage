import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

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
    .headTitle{
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 100px;
        color: #C9C1FF;
    }
`

const InfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    .bundle{
        margin-bottom: 80px;
        .bundle-oneLine{
            display: flex;
            padding-bottom: 40px;
            .oneLine-title{
                width: 150px;
                color: #afafaf;
            }
            .oneLine-input{
                width: 250px;
                font-size: 17px;
                padding: 3px 6px;
                height: 30px;
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

            <BodyWrapper>

                <div className="headTitle">예약 조회하기</div>


                <form onSubmit={onSubmit}>
                

                {/* 정보들 */}
                <div style={{fontSize:"18px"}}>

                    <InfoWrapper>

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
                <ButtonWrapper><button type="submit">조회하기</button></ButtonWrapper>
                <ErrorWrapper><span>{error}</span></ErrorWrapper>


                </form>

            </BodyWrapper>


        </div>
    );
};

export default ReservationLook;