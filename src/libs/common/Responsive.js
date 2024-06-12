// Responsive.js

import React from 'react';

import styled from 'styled-components';

const ResponsiveDiv = styled.div`
    width: 1000px;
    margin: 0 auto;
    @media (max-width: 1000px){
        width: 700px;
    }
    @media (max-width: 700px){
        width: 100%;
    }
`

const Responsive = ({children, ...rest}) => {


    return (
        <ResponsiveDiv {...rest}>{children}</ResponsiveDiv>
    );


};

export default Responsive;