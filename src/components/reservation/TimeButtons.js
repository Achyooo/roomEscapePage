// TimeButtons.js

import React from 'react';
import styled, { css } from 'styled-components';

const TimeButton = styled.button`
    width: 142px;
    height: 50px;
    margin: 10px;
    font-size: 1.3rem;
    font-weight: bold;
    /* transition: all 0.4s; */
    border-radius: 4px;
    color: ${(props) => (props.disabled ? '#aaa' : '#fff')};
    background-color: ${(props) => (props.disabled ? '#ddd' : '#C9C1FF')};
    border: 1px solid ${(props) => (props.disabled ? '#ddd' : '#C9C1FF')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    &:hover {
        color: ${(props) => (props.disabled ? '#aaa' : '#fff')};
        background-color: ${(props) => (props.disabled ? '#ddd' : '#D9D1FF')};
        border: 1px solid ${(props) => (props.disabled ? '#ddd' : '#D9D1FF')};
    }
    ${(props)=>
        props.smallerScreen &&
        css`
            width: 100px;
        `}
`;

const TimeButtons = ({ availableTimes,
                       selectedTheme,
                       selectedDate,
                       onReserve,
                       list,
                       smallerScreen }) => {

    // console.log(list)

    // console.log(selectedThemeIndex)
    // console.log(selectedTheme)
    // console.log(selectedDate)


    // 이미예약되어있는 테마인덱스와 날짜와 시간
    const alreadyReserved = (theme, date, time) => {
        return list.some(item => item.date === date && item.time === time && item.theme === theme);
    };



    return (
        <div>
            {availableTimes.map((time) => {
                const isReserved = alreadyReserved(selectedTheme, selectedDate, time);
                return (
                    <TimeButton
                        key={time}
                        disabled={isReserved}
                        onClick={() => onReserve(selectedTheme, selectedDate, time)}
                        smallerScreen={smallerScreen}
                    >
                        {time}
                    </TimeButton>
                );
            })}
        </div>
    );
};

export default TimeButtons;
