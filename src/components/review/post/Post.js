// Post.js

import React, { useState } from 'react';


import { Link, useNavigate } from 'react-router-dom';

import sky_pastel_a from '../../../datas/images/sky_pastel_a.jpg'
import Button from '../../../libs/common/Button';

import styled, { css, keyframes } from 'styled-components';
import PostActionButton from './PostActionButton';



/////////


const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
`

const BackButtonPlace = styled.div`
    border-top: 1px solid #c0c0c0;
    padding: 30px 0px;
    display: flex;
    justify-content: center;
`


/////


const PostTitleWrapper = styled.div`
    border-bottom: 5px double #ddd;

`
const TitleBundle = styled.div`
    padding-bottom: 17px;
    color: #666;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    .theme{
        color: #FFA8B2;
        font-size: 1.6rem;
        padding-right: 15px;
    }
`

/////

const PostWrapper = styled.div`
    width: 960px;
    margin: 0px auto;
    /* border-bottom: 1px solid #ccc; */
`

const SubTitleBundle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 20px 15px;
    color: #444;
    .nameAndDate{
        /* margin: 20px auto; */
        line-height: 28px;
        .lineTitle{
            color: #FFA8B2;
        }
    }
`

const PostContentDiv = styled.div`
    display: flex;
    text-align: start;
    margin: 20px auto;
    line-height: 28px;
    padding: 4px 15px;
`




// 이건 포스트 글 안
const Post = (props) => {


    const {postings,
           username,
           title,
           content,
           theme,
           nickname,
           loginUsername,
           loginNickname,
           modal,
           modal_mode,
           id, remove_post} = props;


    const navi = useNavigate();

    
    const onClick = () => {
        navi('/write')
    }

    const onClickBack =() => {
        navi('/review')
    }


    // 별 표시로 바꾸기

    const maskingUsername = (n) => {
        const visiblePart = n.slice(0, -Math.ceil(username.length/2));
        const maskedPart = "*".repeat(Math.ceil(username.length/2));
        return visiblePart + maskedPart;
    }

    const maskedUsername = maskingUsername(username);


    // console.log("포스트아이디확인입니다아", username); // 잘 가져옴
    // console.log("지금로그인중인아이디확인합니다아", loginUsername); // 잘 가져옴

    

    return (
        <div>


            <BodyWrapper>

                <PostTitleWrapper>
                    <TitleBundle>
                        <span className='theme'>[{theme}]</span><span>{title}</span>
                    </TitleBundle>
                </PostTitleWrapper>


                <PostWrapper>
                    
                    <SubTitleBundle>

                        <div className='nameAndDate'>
                            <b className='lineTitle'>작성자 : </b> <b>{nickname} </b>({maskedUsername}) <br/>
                            <b className='lineTitle'>작성일자 : </b> {new Date().toLocaleString()}
                        </div>

                        {/* 수정삭제 버튼 노출 여부 */}
                        {username === loginUsername &&
                                <PostActionButton onClick={onClick}
                                                  modal={modal}
                                                  modal_mode={modal_mode}
                                                  id={id}
                                                  remove_post={remove_post}>
                                </PostActionButton>
                        }


                    </SubTitleBundle>

                    <PostContentDiv dangerouslySetInnerHTML={{__html: content}}></PostContentDiv>

                </PostWrapper>

                <BackButtonPlace>
                    <Button onClick={onClickBack} BtnColor>목록으로</Button>
                </BackButtonPlace>

            </BodyWrapper>





        </div>
    );
};

export default Post;