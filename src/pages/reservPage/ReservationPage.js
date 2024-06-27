import React, { memo, useState, useEffect } from 'react';

import { connect } from 'react-redux';

import styled, { css } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'

import Header from '../../libs/common/Header';
import Reservation from '../../components/reservation/Reservation';
import Footer from '../../libs/common/Footer';

import { submit_reservation_register } from '../../modules/reserv';





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