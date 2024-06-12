// WritePage.js

import React, { useEffect, memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import sky_pastel_a from '../../datas/images/sky_pastel_a.jpg'
import { themeDatas } from '../../datas/themeDatas';

import Write from '../../components/review/write/Write';
// import Responsive from '../libs/common/Responsive';
import WriteActionButton from '../../components/review/write/WriteActionButton';
import Header from '../../libs/common/Header';




import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initialize,
         change_title,
         change_content,
         create_post,
         edit_post,
         new_title,
         new_theme,
         change_theme } from '../../modules/write';



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

/////////



const BodyWrapper = styled.div`
    width: 1000px;
    margin: 120px auto;
    margin-bottom: 0px;
    border-bottom: 1px solid #c0c0c0;
`


const ThemeSelectPlace = styled.div`
    margin-bottom: 30px;
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


const WritePage = (props) => {

    const {
        postings,
        loginUsername,
        loginNickname,
        username,
        title,
        content,
        theme,
        initialize,
        change_title,
        change_content,
        change_theme,
        create_post,
        postId,
        postTitle,
        postTags,
        id,
        edit_post,
        new_title,
        new_theme} = props

    
    // console.log(postId, postTitle)
    // console.log("제발", loginUsername, loginNickname)



    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const [selectedTheme, setSelectedTheme] = useState(theme);

    const navi = useNavigate();


    const handleThemeChange = (e) => {
        // setSearchParams({page:1})
        setSelectedTheme(e.target.value);
    }



    const onChange = (e) => {
        // console.log("dd", title)
        change_title(e.target.value);
    }


    
    const onClick = () => {
        if (selectedTheme === "") {
            alert("테마명을 선택해주세요.");
        } else if (title === "") {
            alert("글 제목을 입력해주세요.");
        } else if (content === "" || content === "<p><br></p>") {
            alert("본문 내용을 입력해주세요.");
        } else {
            if (id) {
                edit_post(id, loginUsername, title, content, loginNickname, selectedTheme);
            } else {
                create_post(loginUsername, title, content, loginNickname, selectedTheme);
            }
            navi(`/review`);
        }
    };



    // console.log("테마: ", theme)
    // console.log("셀렉티드테마: ", selectedTheme)



    return (
        <>

        <Header></Header>

        
        <TitleBox>
            <BigTitle>후기 공유</BigTitle>
            <SmallTitle>Sharing Reviews</SmallTitle>
        </TitleBox>

        <BodyWrapper>

            <ThemeSelectPlace>
                        <span>【 테마 】 :</span>

                        <select onChange={handleThemeChange} value={selectedTheme}>
                            <option value="" selected disabled hidden>====== 테마 선택 ======</option>
                            <option value={themeDatas[0].name}>{themeDatas[0].name}</option>
                            <option value={themeDatas[1].name}>{themeDatas[1].name}</option>
                            <option value={themeDatas[2].name}>{themeDatas[2].name}</option>
                        </select>
            </ThemeSelectPlace>

            <Write postings={postings}
                   title={title}
                   change_content={change_content}
                   onChange={onChange}>
            </Write>

        </BodyWrapper>

        <WriteActionButton onClick={onClick}></WriteActionButton>

        </>
    );
};



export default connect(
    (state) => (
        {
            postings: state.write.postings,
            loginUsername: state.auth.loginUsername,
            loginNickname: state.auth.loginNickname,
            title: state.write.title,
            content: state.write.content,
            theme: state.write.theme,

            id: state.write.id

        }
    ),

    {
        initialize,
        change_title,
        change_content,
        create_post,
        edit_post,
        new_title,
        new_theme,
        change_theme
    }
)(memo(WritePage));