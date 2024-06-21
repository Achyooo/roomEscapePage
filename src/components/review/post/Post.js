// Post.js

import React, { useState, useEffect } from 'react';


import { Link, useNavigate } from 'react-router-dom';

import sky_pastel_a from '../../../datas/images/sky_pastel_a.jpg'
import Button from '../../../libs/common/Button';

import styled, { css, keyframes } from 'styled-components';
import PostActionButton from './PostActionButton';



/////////


const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
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
        `
    }
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
    /* 660 미만 환경, 제목 번들 스타일 변경 */
    ${(props)=>
        props.smallerScreen && 
        css`
            display: flex;
            flex-direction: column;
            align-items: start;
            span{
                font-size: 1.7rem;
            }
            .theme{
                font-size: 1.3rem;
            }
        `
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
    /* 660 미만 환경, 작성자 작성일자 번들 스타일 변경 */
    ${(props)=>
        props.smallScreen && 
        css`
            width: 660px;
            padding: 20px 0px;
        `
    }
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 350px;
            flex-direction: column;
            align-items: start;
        `
    }
`

const PostContentDiv = styled.div`
    display: flex;
    text-align: start;
    margin: 20px auto;
    line-height: 28px;
    padding: 4px 15px;
    ${(props)=>
        props.smallScreen && 
        css`
            width: 630px;
            margin: 20px 0px;
        `
    }
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 330px;
            
        `
    }
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
        <>


            <BodyWrapper smallScreen={windowWidth < 1050}
                         smallerScreen={windowWidth < 660}>

                <PostTitleWrapper>
                    <TitleBundle smallScreen={windowWidth < 1050}
                                 smallerScreen={windowWidth < 660}>
                        <span className='theme'>[{theme}]</span><span>{title}</span>
                    </TitleBundle>
                </PostTitleWrapper>


                <PostWrapper>
                    
                    <SubTitleBundle smallScreen={windowWidth < 1050}
                                    smallerScreen={windowWidth < 660}>

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
                                                  remove_post={remove_post}
                                                  smallerScreen={windowWidth < 660}
                                >
                                </PostActionButton>
                        }


                    </SubTitleBundle>

                    <PostContentDiv dangerouslySetInnerHTML={{__html: content}}
                                    smallScreen={windowWidth < 1050}
                                    smallerScreen={windowWidth < 660}></PostContentDiv>

                </PostWrapper>

                <BackButtonPlace>
                    <Button onClick={onClickBack} BtnColor>목록으로</Button>
                </BackButtonPlace>

            </BodyWrapper>





        </>
    );
};

export default Post;