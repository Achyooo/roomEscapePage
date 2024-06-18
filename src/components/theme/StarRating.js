import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import styled from 'styled-components';

const Span = styled.span`
    position: absolute;
    margin-left: 3px;
    &.itemStar {
      position: static !important;
      margin-left: 0 !important;
    }
`

const StarRating = ({ starNum, className }) => {


  
    return (

      <Span className={className}>

        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
  
          return (
            <FaStar
              color={ratingValue <= starNum ? "#555" : "#eee"}
              size={20}
            />
          );
        })}

      </Span>
      
    );
  };

export default StarRating;