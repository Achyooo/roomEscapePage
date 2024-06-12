// postList.js


// 데이터를 가져오는 역할을 하는 리듀서구요


import { handleActions } from "redux-actions";

import { postInfos } from "../datas/postInfos";


const INITIALIZE = "postList/INITIALIZE";


export const initialize = () => ({type:INITIALIZE})





// 밖에다
// const itemsPerPage = 5;
// const lastPage = Math.ceil(Number(postInfos.length) / itemsPerPage);



// 데잇따
const initialState = {
    postInfos,
    itemsPerPage: 10
}



// ㄹㄷㅅ
export const postList = handleActions({

    [INITIALIZE] : (state, actions) => ({

        initialState

    })


}, initialState)