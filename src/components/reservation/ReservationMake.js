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
    .headTitle{
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 100px;
        color: #C9C1FF;
    }
`

const InfoTopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    .bundle-left{
        .bundle-oneLine{
            display: flex;
            padding-bottom: 55px;
            .oneLine-title{
                width: 130px;
                color: #afafaf;
            }
            .oneLine-content{
                width: 200px;
            }
        }
    }
    .bundle-right{
        .bundle-oneLine{
            display: flex;
            padding-bottom: 40px;
            .oneLine-title{
                width: 150px;
                color: #afafaf;
            }
            .oneLine-input{
                width: 230px;
                font-size: 17px;
                padding: 3px 6px;
                height: 30px;
            }
        }
    }
`

const InfoBottomWrapper = styled.div`
    display: flex;
    /* justify-content: space-between; */
    margin-top: 70px;
    margin-bottom: 80px;
    padding: 0px 5px;
    .bundle-left{
        .bundle-oneLine{
            display: flex;
            padding-bottom: 55px;
            .oneLine-title{
                width: 130px;
                color: #afafaf;
            }
            .oneLine-content{
                width: 200px;
            }
        }
    }
    .bundle-right{
        margin-left: 81px;
        .bundle-oneLine{
            display: flex;
            padding-bottom: 40px;
            .oneLine-title{
                width: 150px;
                color: #afafaf;
            }
            .oneLine-select{
                width: 160px;
                height: 40px;
                font-size: 17px;
                padding: 3px 6px;
                display: flex;
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



/////////////



const ReservationMake = (props) => {

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
    

    const [totalPayment, setTotalPayment] = useState("--");
    const [error, setError] = useState();

    const navi = useNavigate();


    const [searchParams] = useSearchParams();
    const themeIndexParam = searchParams.get("themeIndex");
    const themeParam = searchParams.get("theme");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const costParam = searchParams.get("cost");


    const onChange = (e) => {
        const total = costParam*(e.target.value);
        setTotalPayment(total)
    }



    const onSubmit = (e) => {

        e.preventDefault();

        if (e.target.clientName.value === '' || e.target.clientPhone.value === '' || e.target.clientPw.value === '') {
            setError("※ 정보를 모두 입력해주세요. ※");
        } else if (e.target.numOfPeople.value === "--" || e.target.numOfPeople.value === "") {
            setError("※ 인원을 선택해주세요. ※");
        } else {
            const existTime = list.find((item)=>
                item.date===dateParam &&
                item.time===timeParam)
            const existAuth = list.find((item)=>
                item.clientName===e.target.clientName.value &&
                item.clientPhone===e.target.clientPhone.value &&
                item.clientPw===e.target.clientPw.value)
            
            if (existTime){
                alert("※ 이미 예약된 날짜와 시간입니다. ※")
            } else if (existAuth){
                setError("※ 해당 정보는 사용하실 수 없습니다. 다른 정보를 입력해주세요. ※");
            } else {
                submit_reservation_register(
                    themeParam,
                    dateParam,
                    timeParam,
                    e.target.clientName.value,
                    e.target.clientPhone.value,
                    e.target.clientPw.value,
                    costParam,
                    e.target.numOfPeople.value,
                    totalPayment
                );
                alert("예약이 완료되었습니다.");
                
                // 어..잠깐일단여기로꺼져봐..
                navi(`/reservationSuccess?themeIndex=${themeIndexParam}&theme=${themeParam}&date=${dateParam}&time=${timeParam}&person=${e.target.numOfPeople.value}&totalCost=${totalPayment}`);
            }
        }

    }






    return (

        <div>


            <BodyWrapper>

                <div className="headTitle">예약 진행</div>



                <form onSubmit={onSubmit}>
                

                {/* 정보들 */}
                <div style={{fontSize:"18px"}}>

                    {/* 위쪽 6개 */}
                    <InfoTopWrapper>
                        {/* 좌3 */}
                        <div className='bundle-left'>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>테마명</div>
                                <div className='oneLine-content'>{themeParam}</div>
                            </div>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>예약일</div>
                                <div className='oneLine-content'>{dateParam}</div>
                            </div>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>예약 시간</div>
                                <div className='oneLine-content'>{timeParam}</div>
                            </div>
                        </div>

                        {/* 우3 */}
                        <div className='bundle-right'>
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
                    </InfoTopWrapper>


                    {/* 아래쪽 3개 */}
                    <InfoBottomWrapper>
                        {/* 좌1 */}
                        <div className='bundle-left'>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>인당 가격</div>
                                <div className='oneLine-content'>{Number(costParam).toLocaleString('ko-KR')} 원</div>
                            </div>
                        </div>

                        {/* 우2 */}
                        <div className='bundle-right'>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>인원</div>
                                <select className='oneLine-select'
                                        onChange={onChange}
                                        name="numOfPeople">
                                    <option value="" selected disabled hidden>== 인원 선택 ==</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select><span style={{marginLeft:"12px"}}>명</span>
                            </div>
                            <div className='bundle-oneLine'>
                                <div className='oneLine-title'>현장 결제 금액</div>
                                <div className='oneLine-content'>{totalPayment.toLocaleString('ko-KR')} 원</div>
                            </div>
                        </div>
                    </InfoBottomWrapper>

                </div>


                {/* 예약버튼 */}
                <ButtonWrapper><button type="submit">예약하기</button></ButtonWrapper>
                <ErrorWrapper><span>{error}</span></ErrorWrapper>

                </form>

            </BodyWrapper>


        </div>
    );
};

export default ReservationMake;