import React, { useState, useEffect } from 'react';

import styled, { css } from 'styled-components';

import { useSearchParams, useNavigate } from 'react-router-dom';

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
    .headTitle{
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 70px;
        color: #C9C1FF;
        ${(props)=>
            props.smallerScreen && 
            css`
                font-size: 1.6em;
                margin-bottom: 60px;
                text-align: center;
                word-break: keep-all;
            `
        }
    }
    .infoMsg{
        display: flex;
        justify-content: center;
        border: 1px solid #ccc;
        padding: 30px;
        ${(props)=>
            props.smallScreen && 
            css`
                width: 450px;
            `
        }
        ${(props)=>
            props.smallerScreen && 
            css`
                width: 200px;
                word-break: keep-all;
                flex-direction: column;
                align-items: center;
                line-height: 30px;
            `
        }
    }
    ${(props)=>
        props.smallScreen && 
        css`
            width: 660px;
            align-items: center;
        `
    }
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 350px;
            margin: 50px auto;
            align-items: center;
        `
    }
`


const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    margin-top: 70px;
    font-size: 18px;
    /* 660px 이하에서 */
    ${(props)=>
        props.smallerScreen && 
        css`
            align-items: center;
            width: 100%;
        `
    }
    .bundle-oneLine{
        display: flex;
        margin-bottom: 40px;
        /* 660px 이하에서 라인 하나 */
        ${(props)=>
            props.smallerScreen && 
            css`
                font-size: 1rem;
            `
        }
        .oneLine-title{
            width: 200px;
            color: #afafaf;
            /* 660px 이하에서 세부 제목 */
            ${(props)=>
                props.smallerScreen && 
                css`
                    width: 110px;
                `
            }
        }
        .oneLine-content{
            width: 150px;
            /* 660px 이하에서 세부 내용 (샘플테마1, 2024-06-xx, xx:xx) */
            ${(props)=>
                props.smallerScreen && 
                css`
                    margin-left: 30px;
                    width: 100px;
                `
            }
        }
    }
`



const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 80px;
    ${(props)=>
        props.smallerScreen && 
        css`
            margin-top: 40px;
        `
    }
    button{
        width: 250px;
        height: 54px;
        margin: 0px 16px;
        border-radius: 4px;
        font-size: 1.3rem;
        font-weight: bold;
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
        ${(props)=>
            props.smallerScreen && 
            css`
                font-size: 1.2rem;
                width: 120px;
                margin-right: 12px;
            `
        }
    }
    .cancelBtn{
        background-color: #fff;
        border: 1px solid #C9C1FF;
        color: #C9C1FF;
        &:hover{
            background-color: #F9F8FF;
        }
        ${(props)=>
            props.smallerScreen && 
            css`
                font-size: 1.2rem;
                width: 120px;
                margin-left: 12px;
            `
        }
    }
`



/////////////



const ReservationLookSuccess = (props) => {

    const { modal } = props;

    const { modal_mode,
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

            <BodyWrapper smallScreen={windowWidth < 1050}
                         smallerScreen={windowWidth < 660}>

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


                <InfoWrapper smallScreen={windowWidth < 1050}
                             smallerScreen={windowWidth < 660}>

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


                {/* 목록버튼과 예약 취소 버튼 */}
                <ButtonWrapper smallScreen={windowWidth < 1050}
                               smallerScreen={windowWidth < 660}>
                    <button className="backBtn" onClick={onClickBack}>목록으로</button>
                    <button className="cancelBtn" onClick={onClickCancel}>예약 취소</button>    
                </ButtonWrapper>

                <CancelModal modal={modal}
                             modal_mode={modal_mode}
                             remove_reservation={remove_reservation}
                             themeParam={themeParam}
                             dateParam={dateParam}
                             timeParam={timeParam}
                             smallScreen={windowWidth < 1050}
                             smallerScreen={windowWidth < 660}>
                </CancelModal>


            </BodyWrapper>


        </div>
    );
};

export default ReservationLookSuccess;