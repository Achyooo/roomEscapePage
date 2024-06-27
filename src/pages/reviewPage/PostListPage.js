import React, { useState, useEffect } from 'react';

import Header from '../../libs/common/Header';
import PostList from '../../components/review/postList/PostList';
import Footer from '../../libs/common/Footer';

import { connect } from 'react-redux';

import styled, { css } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'

import { new_post, new_title, new_theme, bring_post } from '../../modules/write';





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



const PostListPage = (props) => {
    const {postings,
           bring_post,
           loginUsername,
           loginNickname,
           itemsPerPage,
           new_post,
           new_title,
           new_theme} = props;

    // console.log(postings)
    // postings는 초기 데이터. 그 데이터베이스 배열오브젝트 그거임
    // bring_post는 그 아이디유저네임타이틀컨텐츠캐그즈 가져오는 함수
    // console.log(loginNickname) // 닉네임 잘 뜹니다.


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
        <>
            <Header></Header>

            <TitleBox smallerScreen={windowWidth < 950}>
                <BigTitle>후기 공유</BigTitle>
                <SmallTitle>Sharing Reviews</SmallTitle>
            </TitleBox>

            <PostList postings={postings}
                        bring_post={bring_post}
                        loginUsername={loginUsername}
                        loginNickname={loginNickname}
                        itemsPerPage={itemsPerPage}
                        new_post={new_post}
                        new_title={new_title}
                        new_theme={new_theme}>            
            </PostList>
            
            <Footer></Footer>
        </>
    );
};

export default connect(
    (state) => (
        {
            postings: state.write.postings,
            loginUsername: state.auth.loginUsername,
            loginNickname: state.auth.loginNickname,
            itemsPerPage: state.postList.itemsPerPage,
        }
    ),

    {
        bring_post,
        new_post,
        new_title,
        new_theme
    }

)(PostListPage);