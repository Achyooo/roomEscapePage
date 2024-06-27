// WriteActionButton.js

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../../libs/common/Button';


import styled from 'styled-components';

const ActionButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 130px;
    button+button{
        margin-left: 0.5rem;
    };
`

const StyleButton = styled(Button)`
    word-break: keep-all;
    height: 2.125rem;
    margin-top: 30px;
    &+&{
        margin-left: 1rem;
    };
`



const WriteActionButton = (props) => {

    const {onClick} = props;

    const [isEdit, setIsEdit] = useState(false)

    const navi = useNavigate();

    const onClickBack = () => {
        navi(-1)
    }


    return (
        <ActionButtonDiv>

            <StyleButton onClick={onClickBack}>취소</StyleButton>

            <StyleButton BtnColor
                         onClick={onClick}>
                    {isEdit ? '수정' : '등록'}하기
            </StyleButton>

        </ActionButtonDiv>
    );
};

export default WriteActionButton;