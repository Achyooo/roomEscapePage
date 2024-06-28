// TimeButtons.js

import React from 'react';
import styled, { css } from 'styled-components';

const TimeButton = styled.button`
    width: 142px;
    height: 50px;
    margin: 10px;
    font-size: 1.3rem;
    font-weight: bold;
    border-radius: 4px;
    /* disabled의 여부에 따라 버튼 스타일 다르게 */
    color: ${(props) => (props.disabled ? '#aaa' : '#fff')};
    background-color: ${(props) => (props.disabled ? '#ddd' : '#C9C1FF')};
    border: 1px solid ${(props) => (props.disabled ? '#ddd' : '#C9C1FF')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    /* 시간 버튼에 마우스 올렸을 때 스타일 */
    &:hover {
        color: ${(props) => (props.disabled ? '#aaa' : '#fff')};
        background-color: ${(props) => (props.disabled ? '#ddd' : '#D9D1FF')};
        border: 1px solid ${(props) => (props.disabled ? '#ddd' : '#D9D1FF')};
    }
    /* 이건 660px 이하 환경 */
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

    // console.log(selectedTheme)
    // console.log(selectedDate)


    // 이미예약되어있는 테마인덱스와 날짜와 시간 판독기...같은 것.
    // 리스트 안에 같은 테마날짜시간을 가진 요소가 있는가.
    const alreadyReserved = (theme, date, time) => {
        // 리스트 요소 하나.date === 지금 화면에 떠있는 date와 같니?
        // 나머지도 마찬가지로.
        return list.some(item => item.date === date && item.time === time && item.theme === theme);
        // 그게 true면 그거 예약되어있는거구나! 하고 알수있다.
    };



    return (
        <div>
            {availableTimes.map((time) => {
                const isReserved = alreadyReserved(selectedTheme, selectedDate, time);
                // console.log(isReserved) // 타임버튼 개수중에 false인거 true인거 알려줄거임.

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
