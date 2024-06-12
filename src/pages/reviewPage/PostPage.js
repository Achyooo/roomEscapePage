// PostPage.js

import React from 'react';

import Header from '../../libs/common/Header';
import Post from '../../components/review/post/Post';
// import PostActionButton from '../components/post/PostActionButton';
import Footer from '../../libs/common/Footer';

import { connect } from 'react-redux';

import styled, { css, keyframes } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'

import { bring_post } from '../../modules/write';
import { modal_mode, remove_post } from '../../modules/write';




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




const PostPage = (props) => {

    const {postings,
            username,
            title,
            content,
            theme,
            nickname,
            id,
            loginUsername,
            loginNickname,
            modal_mode,
            modal,
            remove_post} = props

    return (
        <div>
            <Header></Header>

            <TitleBox>
                <BigTitle>후기 공유</BigTitle>
                <SmallTitle>Sharing Reviews</SmallTitle>
            </TitleBox>

            <Post postings={postings}
                username={username}
                title={title}
                content={content}
                theme={theme}
                nickname={nickname}
                loginUsername={loginUsername}
                loginNickname={loginNickname}
                id={id}
                modal_mode={modal_mode}
                modal={modal}
                remove_post={remove_post}/>

            <Footer></Footer>
        </div>
    );
};

export default connect(
    (state) => (
        {
            postings: state.write.postings,
            username: state.write.username,
            title: state.write.title,
            content: state.write.content,
            theme: state.write.theme,
            nickname: state.write.nickname,
            loginUsername: state.auth.loginUsername,
            loginNickname: state.auth.loginNickname,

            modal: state.write.modal,

            id: state.write.id
        }
    ),

    {
        bring_post,
        modal_mode,
        remove_post

    }
)(PostPage);
