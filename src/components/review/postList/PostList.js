// PostList.js

import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';

import Responsive from '../../../libs/common/Responsive'

import sky_pastel_a from '../../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../../datas/themeDatas'

import Button from '../../../libs/common/Button';

import PostItem from './PostItem';
import Pagination from './Pagination';



/////

const appearAni = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
    margin-bottom: 40px;
    border-bottom: 1px solid #c0c0c0;
    animation: ${appearAni} 0.5s ease-out forwards;
`

const TopOfListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px double #ddd;
    padding-bottom: 30px;
`

const ThemeSelectPlace = styled.div`
    span{
        font-weight: bold;
        padding-right: 9px;
        color: #FFA8B2;
    }
    select{
        width: 200px;
        height: 30px;
        font-size: 14px;
        padding: 0px 3px;
        background-color: #F0F0F0;
        border-radius: 4px;
    }
`



const PostingsPlace = styled.div`
    width: 960px;
    margin: 0px auto;
`


/////




////////////



const PostList = (props) => {

    // 받아오고
    const {postings,
           bring_post,
           loginUsername,
           loginNickname,
           itemsPerPage,
           new_post,
           new_title,
           new_theme} = props

    // 쓰겟다
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const [selectedTheme, setSelectedTheme] = useState("All");



    
    const onClickNewPost = () => {
        new_post("")
        new_title("")
        new_theme("")
    }


    const handleThemeChange = (e) => {
        setSelectedTheme(e.target.value);
        setSearchParams({page:1})
    }



    const filteredPostings = selectedTheme === "All" ?
                                postings :
                                postings.filter(post => post.theme === selectedTheme)


    // console.log(filteredPostings)

    // console.log(postings[1].theme);




    return (
        <div>


            <BodyWrapper>

                <TopOfListWrapper>

                        <ThemeSelectPlace>
                            <span>【 테마 】 :</span>

                            <select onChange={handleThemeChange}>
                                <option value="All">====== 전체 보기 ======</option>
                                <option value={themeDatas[0].name}>{themeDatas[0].name}</option>
                                <option value={themeDatas[1].name}>{themeDatas[1].name}</option>
                                <option value={themeDatas[2].name}>{themeDatas[2].name}</option>
                            </select>
                        </ThemeSelectPlace>


                        {loginUsername ? (
                            <Button to="/write"
                                    onClick={onClickNewPost}
                                    BtnColor>글 작성하기
                            </Button>)
                            :
                            <span style={{color:"red", fontSize:"15px"}}>※ 로그인 후 글 작성이 가능합니다.</span>
                        }
  

                </TopOfListWrapper>

                {/* {postings && postings.map((item)=>(<PostItem item={item} onClick={onClick}/>))} */}
                {/* 그 데이터가져올수있는 클릭이벤을 포스팅글하나하나에 뿌려줌 */}
            
                {/* {postings && postings.map((item, idx)=>(<PostItem item={item} key={idx} onClick={onClick}/>))} */}

                <PostingsPlace>
                    {/* {postings && postings.map((item, idx)=>{
                        if(
                            itemsPerPage * (page-1) <= idx &&
                            idx <= itemsPerPage * (page-1) + (itemsPerPage-1)
                        ){
                            return <PostItem item={item} bring_post={bring_post}/>
                                
                        }}
                        )
                    } */}

                    {filteredPostings && filteredPostings.slice((page-1) * itemsPerPage, page * itemsPerPage).map((item, idx) => (
                        <PostItem key={idx}
                                  item={item}
                                  bring_post={bring_post}
                                  loginUsername={loginUsername}
                                  loginNickname={loginNickname} />
                    ))}
                </PostingsPlace>


        </BodyWrapper>



        <Pagination loginUsername={loginUsername}
                    itemsPerPage={itemsPerPage}
                    filteredPostings={filteredPostings}>
        </Pagination>
        


        </div>
    );
};

export default PostList;