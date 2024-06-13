import React, { useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { useSearchParams, useNavigate } from 'react-router-dom';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../datas/themeDatas'



/////

const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
    box-sizing: border-box;
    padding: 70px 90px;
    border: 1px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .headTitle{
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 30px;
        color: #C9C1FF;
    }
`


const CheckCircle = styled.div`
    width: 50px;
    height: 50px;
    font-size: 35px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    background-color: #C9C1FF;
`




const InfoWrapper = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    font-size: 18px;
    .bundle-oneLine{
        display: flex;
        margin-bottom: 40px;
        .oneLine-title{
            width: 200px;
            color: #afafaf;
        }
        .oneLine-content{
            width: 150px;
        }
    }
`



const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    button{
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




/////////////



const ReservationSuccess = (props) => {

    const { clientPhone,
            clientPw,
            numOfPeople,
            theme,
            date,
            time,
            perCost,
            totalCost,
            list } = props;

    const { submit_reservation_register } = props;


    const navi = useNavigate();


    const [searchParams] = useSearchParams();
    const themeIndexParam = searchParams.get("themeIndex");
    const themeParam = searchParams.get("theme");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const personParam = searchParams.get("person");
    const costParam = Number(searchParams.get("totalCost"));


    // console.log(themeParam, dateParam, timeParam, personParam, costParam)



    const onClick = () => {
        navi(`/reservation?themeIndex=${themeIndexParam}`)
    }



    return (

        <div>


            <BodyWrapper>

                <div className="headTitle">예약이 완료되었습니다.</div>
                
                <CheckCircle>✔</CheckCircle>

                <InfoWrapper>
                    <div className='bundle-oneLine'>
                        <div className='oneLine-title'>테마명</div>
                        <div className='oneLine-content'>{themeParam}</div>
                    </div>

                    <div className='bundle-oneLine'>
                        <div className='oneLine-title'>예약일</div>
                        <div className='oneLine-content'>{dateParam}</div>
                    </div>

                    <div className='bundle-oneLine'>
                        <div className='oneLine-title'>시간</div>
                        <div className='oneLine-content'>{timeParam}</div>
                    </div>

                    <div className='bundle-oneLine'>
                        <div className='oneLine-title'>인원</div>
                        <div className='oneLine-content'>{personParam}</div>
                    </div>

                    <div className='bundle-oneLine'>
                        <div className='oneLine-title'>현장 결제 금액</div>
                        <div className='oneLine-content'>{Number(costParam).toLocaleString('ko-KR')} 원</div>
                    </div>
                </InfoWrapper>


                {/* 빾 투더 예약. 근데 파라미터 받아서 해당 테마로. */}
                <ButtonWrapper><button onClick={onClick}>목록으로</button></ButtonWrapper>


            </BodyWrapper>


        </div>
    );
};

export default ReservationSuccess;