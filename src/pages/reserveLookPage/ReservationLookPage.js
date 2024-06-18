import React, { memo, useState, useEffect } from 'react';

import { connect } from 'react-redux';

import styled, { css, keyframes } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'

import Header from '../../libs/common/Header';
import ReservationLook from '../../components/reservationLook/ReservationLook';
import Footer from '../../libs/common/Footer';

import { submit_reservation_login } from '../../modules/reserv';





const TitleBox = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${sky_pastel_a});
    background-position: center;
    background-size: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 50px;
    ${(props)=>
        props.smallerScreen &&
        css`
            margin-top: 100px;
        `
    }
`

const BigTitle = styled.div`
    font-size: 1.7rem;
    color: #666;
`

const SmallTitle = styled.div`
    font-size: 1.1rem;
    color: #666;
`



const ReservationLookPage = (props) => {

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


    return (
        <div>
            <Header></Header>

            <TitleBox smallerScreen={windowWidth < 950}>
                <BigTitle>예약 조회 및 취소</BigTitle>
                <SmallTitle>Checking or Cancelling a Reservation</SmallTitle>
            </TitleBox>

            <ReservationLook clientPhone={clientPhone}
                             clientPw={clientPw}
                             numOfPeople={numOfPeople}
                             theme={theme}
                             date={date}
                             time={time}
                             perCost={perCost}
                             totalCost={totalCost}
                             submit_reservation_login={submit_reservation_login}
                             list={list}>
            </ReservationLook>

            <Footer></Footer>
        </div>
    );
};

export default connect(
    (state)=>(
        {
            clientPhone: state.reserv.clientPhone,
            clientPw: state.reserv.clientPw,
            numOfPeople: state.reserv.numOfPeople,
            theme: state.reserv.theme,
            date: state.reserv.date,
            time: state.reserv.time,
            perCost: state.reserv.perCost,
            totalCost: state.reserv.totalCost,
            list: state.reserv.list
        }
    ),

    {
        submit_reservation_login
    }
)(memo(ReservationLookPage));