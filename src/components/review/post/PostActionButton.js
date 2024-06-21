import React from 'react';

import palette from '../../../libs/styles/palette';

import styled, { css } from 'styled-components';
import DeleteModal from '../../../libs/modals/DeleteModal'



const PostActionDiv = styled.div`
    ${props=>
        props.smallerScreen &&
        css`
            align-self: end;
            margin-top: 20px;
        `
    }
`

const ActionButton = styled.button`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: #FFA8B2;
    font-weight: bold;
    border: none;
    outline: none;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
        background: #FFEFF2;
        color: #FF88A0;
    }
    & + & {
        margin-left: 0.45rem;
    }
`




const PostActionButton = (props) => {

    const {onClick, modal_mode, modal, remove_post, id, smallerScreen} = props;

    const onClickRemove = () => {
        modal_mode(true)
    }


    return (
        <PostActionDiv smallerScreen={smallerScreen}>

            <ActionButton onClick={onClick}>수정</ActionButton>
            <ActionButton onClick={onClickRemove}>삭제</ActionButton>

            {/* 삭제 확인 모달 */}
            <DeleteModal modal_mode={modal_mode}
                         modal={modal}
                         id={id}
                         remove_post={remove_post}/>
                         
        </PostActionDiv>
    );
};

export default PostActionButton;