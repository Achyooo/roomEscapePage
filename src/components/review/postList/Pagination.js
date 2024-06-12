// Pagination.js

import React, { useState, useRef } from 'react';

import { Link, useParams, useSearchParams } from 'react-router-dom';

import qs from 'qs'

import Button from '../../../libs/common/Button';

import styled from 'styled-components';


const PaginationDiv = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 120px;
`









const Pagination = (props) => {

    const {loginUsername, filteredPostings, itemsPerPage} = props

    // console.log(userNickname)
    // console.log(itemsPerPage)

    // console.log(filteredPostings)

    const buildLink = ({page}) => {
        const query = qs.stringify({page})
        // console.log(page)
        // return userNickname ? `/review/${userNickname}?${query}` : `/review/?${query}`
        return `/review/?${query}`
    }


    // 쓰겠다
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const totalPage = Math.ceil(Number(filteredPostings.length) / itemsPerPage);


    // console.log(page, totalPage)

    return (
        <PaginationDiv>

            <Button
                BtnColor
                disabled={page===1}
                to={
                    page===1 ? undefined : buildLink({loginUsername, page:page-1})
                }>
                이전
            </Button>


            <div>{page}</div>
            {/* 가운데 숫자 */}


            <Button
                BtnColor
                disabled={page===totalPage}
                to={
                    page===totalPage ? undefined : buildLink({loginUsername, page:page+1})
                }>
                다음
            </Button>
            
        </PaginationDiv>
    );
};

export default Pagination;