import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import StarRating from '../theme/StarRating';
import { themeDatas } from '../../datas/themeDatas';
import styled from 'styled-components';


// 카로셀 세팅
const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
};


// 컨테이너 스타일
const Container = styled.div`
    max-width: 1200px;
    margin: 100px auto;
    text-align: center;
`;



const carouselList = [ themeDatas[0], themeDatas[1], themeDatas[2] ];

const CarouselWrapper = styled.div`

`;


const Carousel = () => {
    return (
        <Container>
            <p>Themes</p>

            <Slider {...settings}>
                <div><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
                <div><h3>5</h3></div>
                <div><h3>6</h3></div>
            </Slider>

        </Container>
    );
};

export default Carousel;
