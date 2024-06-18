import React from 'react';

import styled from 'styled-components';



const FooterDiv = styled.div`
    width: 100%;
    background: #aaa;
    z-index: 998;
`

const Describe = styled.div`
    color: white;
    padding: 30px;
    line-height: 1.5rem;
    text-align: center;
    word-break: keep-all;
`

const GeneralConditions = styled.div`
    background-color: #fff;
    padding: 20px;
    line-height: 1.5rem;
    text-align: center;
    font-size: 12px;
`

const Footer = () => {
    return (
        <>
        <FooterDiv>
            <Describe>
                상호 : 드림룸 │ 대표 : 나였으면 좋겠다 │ 사업자번호 : 123-45-67890<br/>
                전화 : 010-1234-5678<br/>
                주소 : 어째서 방탈출 카페는 서울에만 집중되어 있을까<br/>
            </Describe>

            <GeneralConditions>
                COPYRIGHT ⓒ 2020 드림룸. All right reserved. / CREATED BY WHERE.
            </GeneralConditions>
        </FooterDiv>
        </>
    );
};

export default Footer;