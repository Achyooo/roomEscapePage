import React, { memo } from 'react';

import { connect } from 'react-redux';

import styled, { css, keyframes } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'

import Header from '../../libs/common/Header';
import Reservation from '../../components/reservation/Reservation';
import Footer from '../../libs/common/Footer';

import { submit_reservation_register } from '../../modules/reserv';



const updownAni = keyframes`
    0% {
        background-position: center;
    }
    50% {
        background-position: center -470px;
    }
    100% {
        background-position: center;
    }
`;

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
    /* animation: ${updownAni} 4s ease-in-out infinite; */
`

const BigTitle = styled.div`
    font-size: 1.7rem;
    color: #666;
`

const SmallTitle = styled.div`
    font-size: 1.1rem;
    color: #666;
`



const ReservationPage = (props) => {

    const { clientPhone,
            clientPw,
            numOfPeople,
            theme,
            date,
            time,
            perCost,
            totalCost,
            list } = props;



    return (
        <div>
            <Header></Header>

            <TitleBox>
                <BigTitle>예약하기</BigTitle>
                <SmallTitle>Making a Reservation</SmallTitle>
            </TitleBox>


            <Reservation clientPhone={clientPhone}
                                clientPw={clientPw}
                                numOfPeople={numOfPeople}
                                theme={theme}
                                date={date}
                                time={time}
                                perCost={perCost}
                                totalCost={totalCost}
                                list={list}>
            </Reservation>

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
        submit_reservation_register
    }
)(memo(ReservationPage));