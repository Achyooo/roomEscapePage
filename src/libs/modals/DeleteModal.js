import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'

import Button from '../common/Button';

import styled from 'styled-components';

const FullScreenDiv = styled.div`
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.25);
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalDiv = styled.div`
    width: 320px;
    background: white;
    padding: 1.5rem;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.125);
    h2{
        margin-top: 0;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid #c0c0c0;
    }
    p{
        margin-bottom: 3rem;
    }
    .buttons{
        display: flex;
        justify-content: flex-end;
    }
`

const StyledButton = styled(Button)`
    height: 2rem;
    &+&{
        margin-left: 0.75rem;
    }
`


const DeleteModal = (props) => {

    const {modal,
           modal_mode,
           remove_post,
           id} = props;


    const [visible, setVisible] = useState(false)


    useEffect(()=>{
        setVisible(modal);
    }, [modal])


    const navi = useNavigate();

    const onClickBackground = () => {
        modal_mode(false);
    }

    const onClickModal = (e) => {
        e.stopPropagation();
    }

    const onConfirm = () => {
        modal_mode(false);
        remove_post(id);
        navi('/review');
    }

    const onCancel = () => {
        modal_mode(false);
    }


    if(!visible) return null;

    


    return (
        <FullScreenDiv onClick={onClickBackground}>
            <ModalDiv onClick={onClickModal}>
                <h2>삭제 확인</h2>
                <p>정말 삭제하시겠습니까?</p>
                <div className='buttons'>
                    <StyledButton onClick={onConfirm}>네</StyledButton>
                    <StyledButton onClick={onCancel}>아니오</StyledButton>
                </div>
            </ModalDiv>
        </FullScreenDiv>
    );
};

export default DeleteModal;