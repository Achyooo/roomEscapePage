import React, { useState } from 'react';

import styled, { keyframes } from 'styled-components';

import { useSearchParams, useNavigate } from 'react-router-dom';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../datas/themeDatas'

import CancelModal from '../../libs/modals/CancelModal';



/////

const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
    box-sizing: border-box;
    padding: 70px 90px;
    border: 1px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    .headTitle{
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 70px;
        color: #C9C1FF;
    }
    .infoMsg{
        display: flex;
        justify-content: center;
        border: 1px solid #ccc;
        padding: 30px;
    }
`


const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    margin-top: 70px;
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
        width: 250px;
        height: 54px;
        margin: 0px 16px;
        border-radius: 4px;
        font-size: 1.3rem;
        font-weight: bold;
        /* transition: all 0.4s; */
        cursor: pointer;
    }
    .backBtn{
        background-color: #C9C1FF;
        border: 1px solid #C9C1FF;
        color: #fff;
        &:hover{
            border: 1px solid #D9D1FF;
            background-color: #D9D1FF;
        }
    }
    .cancelBtn{
        background-color: #fff;
        border: 1px solid #C9C1FF;
        color: #C9C1FF;
        &:hover{
            background-color: #F9F8FF;
        }
    }
`



/////////////



const ReservationLookSuccess = (props) => {

    const { clientName,
            clientPhone,
            clientPw,
            numOfPeople,
            theme,
            date,
            time,
            perCost,
            totalCost,
            list,
            modal } = props;

    const { submit_reservation_login,
            modal_mode,
            remove_reservation } = props;




    const navi = useNavigate();


    const [searchParams] = useSearchParams();
    const themeParam = searchParams.get("theme");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const personParam = searchParams.get("person");
    const costParam = Number(searchParams.get("totalCost"));
    const clientNameParam = searchParams.get("clientName");
    const clientPhoneParam = searchParams.get("clientPhone");





    const addHyphen = (p) => {
        if (p.length === 11) {
            const startPart = p.slice(0, 3);
            const middlePart = p.slice(3, 7);
            const lastPart = p.slice(7);
            return `${startPart}-${middlePart}-${lastPart}`;
        } else {
            return p;
        }
    };
    const phoneNumWithHyphen = addHyphen(clientPhoneParam);



    const onClickBack = () => {
        navi(-1)
    }

    const onClickCancel = () => {
        modal_mode(true)
    }




    return (

        <div>

            <BodyWrapper>

                <div className="headTitle">예약 조회하기</div>

                
                <div className="infoMsg">
                    <span style={{fontWeight:"bold", color:"#C9C1FF"}}>
                        {clientNameParam}&nbsp;
                    </span>
                    <span style={{color:"#afafaf"}}>
                        ({phoneNumWithHyphen})&nbsp;
                    </span>
                    님의 예약 정보
                </div>


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


                {/* 목록버튼과 삭제버튼 만들 예정 */}
                <ButtonWrapper>
                    <button className="backBtn" onClick={onClickBack}>목록으로</button>
                    <button className="cancelBtn" onClick={onClickCancel}>예약 취소</button>    
                </ButtonWrapper>

                <CancelModal modal={modal}
                             modal_mode={modal_mode}
                             remove_reservation={remove_reservation}
                             themeParam={themeParam}
                             dateParam={dateParam}
                             timeParam={timeParam}>
                </CancelModal>


            </BodyWrapper>


        </div>
    );
};

export default ReservationLookSuccess;