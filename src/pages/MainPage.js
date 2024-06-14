// MainPage.js

import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../libs/common/Header';
import Main from '../components/main/Main';
import Carousel from '../components/main/Carousel';
import Caution from '../components/main/Caution';
import Footer from '../libs/common/Footer';



const MainPage = () => {
    return (

        <div>
            <Header></Header>

            <Main></Main>

            <Carousel></Carousel>

            <Caution></Caution>
            
            <Footer></Footer>
        </div>

    );
};

export default MainPage;