// PostItem.js

import React from 'react';

import { Link } from 'react-router-dom';

import palette from '../../../libs/styles/palette';
import styled, { css } from 'styled-components';



const PostItemDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    &+&{
        border-top: 1px solid #ccc;
    }
    span>a{
        color: #444;
        text-decoration: none;
        font-weight: bold;
        &:hover{
            color: #888;
        }
    }
`

const SubInfoDiv = styled.div`
    display: flex;
    align-items: center;
    ${props=>
        props.hasMarginTop && 
        css`
            margin-top: 1rem;
        `
    }
`






// 이게 리스트 하나.
const PostItem = (props) => {

    const {item, bring_post, loginUsername, loginNickname} = props;

    // console.log(item)

    const onClick = () => {
        bring_post(
            item.id,
            item.username,
            item.title,
            item.content,
            item.theme,
            item.nickname
        )
    }



    // *로 바꾸기

    const maskingUsername = (n) => {

        // console.log(Math.floor(item.username.length/2))
        const visiblePart = n.slice(0, -Math.ceil(item.username.length/2));
        const maskedPart = "*".repeat(Math.ceil(item.username.length/2));
        return visiblePart + maskedPart;
    }

    const maskedUsername = maskingUsername(item.username);


    
    return (
        <PostItemDiv>
            
            <span>
                <span style={{fontSize:"14px",
                              marginRight:"12px",
                              fontWeight:"bold",
                              color:"#FFA8B2"}}>
                        [{item.theme}]
                </span>

                <Link to="/username/id"
                      onClick={onClick}>
                    {item.title}
                </Link>
            </span>


            <SubInfoDiv>
                
                <span style={{fontWeight:"bold",
                              color:"#FFA8B2"}}>
                    {item.nickname}
                </span>

                <span style={{fontSize:"14px",
                              marginLeft:"4px",
                              color:"#666"}}>
                        ({maskedUsername})
                </span>

                <span style={{fontSize:"10px",
                              color:"#888",
                              marginLeft:"14px"}}>
                        {new Date().toLocaleDateString()}
                </span>

            </SubInfoDiv>

        </PostItemDiv>
    );
};

export default PostItem;