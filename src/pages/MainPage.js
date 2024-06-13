// MainPage.js

import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../libs/common/Header';
import Button from '../libs/common/Button';
import Main from '../components/main/Main';
import Carousel from '../components/main/Carousel';
import Footer from '../libs/common/Footer';


const MainPage = () => {
    return (

        <div>
            <Header></Header>

            <Main></Main>

            <Carousel></Carousel>

            <div style={{height:"300px", textAlign:"center", paddingTop:"250px"}}>아무튼 이것저것 나중에 추가함</div>
            
            <Footer></Footer>
        </div>

    );
};

export default MainPage;