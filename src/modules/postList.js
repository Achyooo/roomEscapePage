// postList.js




import { handleActions } from "redux-actions";

import { postInfos } from "../datas/postInfos";


const INITIALIZE = "postList/INITIALIZE";


export const initialize = () => ({type:INITIALIZE})





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