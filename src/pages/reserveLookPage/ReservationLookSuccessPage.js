import React, { memo, useState, useEffect } from 'react';

import { connect } from 'react-redux';

import styled, { css, keyframes } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'

import Header from '../../libs/common/Header';
import ReservationLookSuccess from '../../components/reservationLook/ReservationLookSuccess';
import Footer from '../../libs/common/Footer';

import { submit_reservation_register, modal_mode, remove_reservation } from '../../modules/reserv';




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



const ReservationLookSuccessPage = (props) => {

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

    const { submit_reservation_register,
            modal_mode,
            remove_reservation } = props;


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

            <ReservationLookSuccess clientName={clientName}
                                    clientPhone={clientPhone}
                                    clientPw={clientPw}
                                    numOfPeople={numOfPeople}
                                    theme={theme}
                                    date={date}
                                    time={time}
                                    perCost={perCost}
                                    totalCost={totalCost}
                                    submit_reservation_register={submit_reservation_register}
                                    list={list}
                                    modal_mode={modal_mode}
                                    modal={modal}
                                    remove_reservation={remove_reservation}>
            </ReservationLookSuccess>

            <Footer></Footer>
        </div>
    );
};



export default connect(
    (state)=>(
        {
            clientName: state.reserv.clientName,
            clientPhone: state.reserv.clientPhone,
            clientPw: state.reserv.clientPw,
            numOfPeople: state.reserv.numOfPeople,
            theme: state.reserv.theme,
            date: state.reserv.date,
            time: state.reserv.time,
            perCost: state.reserv.perCost,
            totalCost: state.reserv.totalCost,
            list: state.reserv.list,

            modal: state.reserv.modal
        }
    ),

    {
        submit_reservation_register,
        modal_mode,
        remove_reservation
    }
)(memo(ReservationLookSuccessPage));
