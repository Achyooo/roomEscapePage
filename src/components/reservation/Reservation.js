// Reservation.js

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import styled, { keyframes, css } from 'styled-components';

import Calendar from 'react-calendar';
import moment from "moment";
import "./CalendarStyle.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import TimeButtons from './TimeButtons';

import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../datas/themeDatas'




//

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
    display: flex;
    justify-content: space-between;
    animation: ${appearAni} 0.5s ease-out forwards;
    ${(props)=>
        props.smallScreen && 
        css`
            width: 100%;
            align-items: center;
        `
    }
        ${(props)=>
        props.smallerScreen && 
        css`
            margin: 50px auto;
        `
    }
`

const OneThemePlace = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-bottom: 30px;
`

const ImgStyle = styled.img`
    width: 300px;
    height: 424px;
    object-fit: cover;
    box-shadow: 7px 7px 9px rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
    cursor: pointer;
    &:hover{
        transform: translate(-7px, -10px);
        box-shadow: 11px 11px 13px rgba(0, 0, 0, 0.1);
    }
    ${(props) =>
        props.smallerScreen &&
        css`
            width: 250px;
            height: 353px;
        `}
`

const ReallyOneThemePlace = styled.div`
    display: flex;
    ${(props)=>
        props.smallScreen && 
        css`
            flex-direction: column;
            align-items: center;
        `
    }
`

const InfoWrapper = styled.div`
    width: 650px;
    padding-left: 50px;
    position: relative;
    ${(props)=>
        props.smallScreen && 
        css`
            margin-top: 40px;
            padding-left: 0;
        `
    }
    ${(props) =>
        props.smallerScreen &&
        css`
            width: 350px;
    `}
`

const TitleAndDateWrapper = styled.div`
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-bottom: 5px double #ddd;
    padding-bottom: 25px;
`

const Bundle = styled.div`
    display: flex;
    flex-direction: row;
`

const ThemeTitleStyle = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #C9C1FF;
    ${(props)=>
        props.smallerScreen &&
        css`
            font-size: 1.6rem;
        `
    }
`

const Dotdot = styled.div`
    color: #C9C1FF;
    font-size: 2rem;
    font-weight: bold;
    margin: 0px 24px 0px 20px;
    transform: translateY(-5px);
    ${(props)=>
        props.smallerScreen &&
        css`
            font-size: 1.6rem;
        `
    }
`

const InputPlace = styled.div`
    display: flex;
    ${(props)=>
        props.smallerScreen &&
        css`
            width: 246px;
        `
    }
`

const SelectBox = styled.select`
    width: 533px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #888;
    padding-left: 10px;
    border: 1px solid #888;
    border-radius: 5px;
    background-color: #F0F0F0;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    ${(props)=>
        props.smallerScreen &&
        css`
            font-size: 1.2rem;
        `
    }
`


const DropdownButton = styled.button`
    width: 533px;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 5px;
    color: #888;
    border: 1px solid #888;
    padding: 0px 12px;
    text-align: start;
    appearance: none;
    position: relative;
    background-color: #F0F0F0;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    ${(props)=>
        props.smallerScreen &&
        css`
            font-size: 1.2rem;
        `
    }
`

const CalendarWrapper = styled.div`
    z-index: 11;
    position: absolute;
    top: 100%;
    left: 14%;
    display: ${(props) => (props.isOpen ? "block" : "none")};
`

const TimeButtonWrapper = styled.div`
    display: flex;
    height: 264px;
    margin-top: 30px;
    ${(props)=>
        props.smallerScreen &&
        css`
            text-align: center;
            margin-bottom: 150px;
        `
        }
`



const Reservation = (props) => {

    const { list } = props;


    // console.log(list) // 예약된리스트


    const [value, onChange] = useState(new Date());
    const [nowDate, setNowDate] = useState("날짜 선택");
    const [isOpen, setIsOpen] = useState(false);

    const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);


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



    const [searchParams] = useSearchParams();
    const navi = useNavigate();
    const calendarRef = useRef();



    useEffect(()=>{
        const themeIndex = searchParams.get('themeIndex');
        if(themeIndex){
            setSelectedThemeIndex(parseInt(themeIndex))
        }
        setNowDate(moment(new Date()).format("YYYY년 MM월 DD일"));
    }, [searchParams])



    // 달력 클릭
    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (selectedDate) => {
        onChange(selectedDate);
        setIsOpen(false);
        setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
    };

    const handleThemeChange = (e) => {
        const index = themeDatas.findIndex(theme => theme.name === e.target.value);
        // console.log(index);
        setSelectedThemeIndex(index);
    };

    useEffect(() => {
        setNowDate(moment(new Date()).format("YYYY년 MM월 DD일"));
    }, []);

    const disablePastDates = ({ date, view }) => {
        if (view === 'month') {
            const today = new Date().setHours(0, 0, 0, 0);
            return date < today;
        }
        return false;
    };
    

    // 캘린더 바깥 클릭했을때 캘린더 닫히는 기능인데여
    // 근데 박스 다시 클릭해도 캘린더 닫히는 기능 유지하고싶어서 이따 개선
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (calendarRef.current && !calendarRef.current.contains(event.target)) {
    //             setIsOpen(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);



    const handleReserve = (theme, date, time) => {

        console.log(theme, date, time)
        // TimeButtons에서 온거야. TimeButtons에서 함수가 호출될 때 전달되는 인자.
        
        const cost = themeDatas[selectedThemeIndex].cost;

        // 파라미터 갖고 여기로 가요
        navi(`/reservationMake?themeIndex=${selectedThemeIndex}&theme=${theme}&date=${date}&time=${time}&cost=${cost}`)
        
    }


 

    ///////////////////////////////////////////////////////////



    return (
        <div>

            <BodyWrapper smallScreen={windowWidth < 1050}
                         smallerScreen={windowWidth < 660}>
                <OneThemePlace>
                    <ReallyOneThemePlace smallScreen={windowWidth < 1050}>

                        <ImgStyle src={themeDatas[selectedThemeIndex].poster}
                                  alt="그림이 왜 안 보일까"
                                  smallerScreen={windowWidth < 660} />

                        <InfoWrapper smallScreen={windowWidth < 1050}
                                     smallerScreen={windowWidth < 660}>

                            <TitleAndDateWrapper smallerScreen={windowWidth < 660}>
                                <Bundle smallerScreen={windowWidth < 660}>
                                    <ThemeTitleStyle smallerScreen={windowWidth < 660}>테마</ThemeTitleStyle>
                                    <Dotdot smallerScreen={windowWidth < 660}>:</Dotdot>
                                    <InputPlace smallerScreen={windowWidth < 660}>
                                        <SelectBox name="name"
                                                   value={themeDatas[selectedThemeIndex].name}
                                                   onChange={handleThemeChange}
                                                   smallerScreen={windowWidth < 660}
                                        >
                                            {themeDatas.map((theme, index) => (
                                                <option key={index} value={theme.name}>
                                                    {theme.name}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputPlace>
                                </Bundle>
                                <Bundle smallerScreen={windowWidth < 660}>
                                    <ThemeTitleStyle smallerScreen={windowWidth < 660}>날짜</ThemeTitleStyle>
                                    <Dotdot smallerScreen={windowWidth < 660}>:</Dotdot>
                                    <InputPlace style={{ position: "relative" }}
                                                smallerScreen={windowWidth < 660}>
                                        <DropdownButton onClick={handleToggleCalendar}
                                                        smallerScreen={windowWidth < 660}>
                                                {nowDate}
                                        </DropdownButton>
                                        <CalendarWrapper ref={calendarRef} isOpen={isOpen}>
                                            <Calendar
                                                onChange={handleDateChange}
                                                value={value}
                                                formatDay={(locale, date) => moment(date).format("DD")}
                                                tileDisabled={disablePastDates}
                                            />
                                        </CalendarWrapper>
                                    </InputPlace>
                                </Bundle>
                            </TitleAndDateWrapper>



                            <TimeButtonWrapper smallerScreen={windowWidth < 660}>

                                <TimeButtons availableTimes={themeDatas[selectedThemeIndex].availableTimes}
                                             selectedTheme={themeDatas[selectedThemeIndex].name}
                                             selectedDate={moment(value).format("YYYY-MM-DD")}
                                             onReserve={handleReserve} 
                                             list={list}
                                             smallerScreen={windowWidth < 660} />

                            </TimeButtonWrapper>


                        </InfoWrapper>

                    </ReallyOneThemePlace>
                </OneThemePlace>
            </BodyWrapper>
        </div>
    );
};

export default Reservation;
