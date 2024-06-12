// write.js


import { handleActions } from "redux-actions"

import { idPws } from "../datas/idPws"
import { postInfos } from "../datas/postInfos";



// 타입
const INITIALIZE = "write/INITIALIZE"
const CHANGE_TITLE = "write/CHANGE_TITLE"
const CHANGE_CONTENT = "write/CHANGE_CONTENT"
const CHANGE_THEME = "write/CHANGE_THEME"
const CREATE_POST = "write/CREATE_POST"
const EDIT_POST = "write/EDIT_POST"
const NEW_POST = "write/NEW_POST"
const NEW_TITLE = "write/NEW_TITLE"
const NEW_THEME = "write/NEW_THEME"
const BRING_POST = "write/BRING_POST"
const REMOVE_POST = "write/REMOVE_POST"
const MODAL_MODE = "write/MODAL_MODE"



// 함수
export const initialize = () => ({type:INITIALIZE})
export const change_title = (title) => ({type:CHANGE_TITLE, title})
export const change_content = (content) => ({type:CHANGE_CONTENT, content})
export const change_theme = (theme) => ({type:CHANGE_THEME, theme})
export const create_post = (username, title, content, nickname, theme) => ({type:CREATE_POST, username, title, content, nickname, theme})
export const edit_post = (id, username, title, content, nickname, theme) => ({type: EDIT_POST, id, username, title, content, nickname, theme})
export const new_post = (content) => ({type: NEW_POST, content})
export const new_title = (title, id) => ({type: NEW_TITLE, title, id})
export const new_theme = (theme) => ({type: NEW_THEME, theme})
export const bring_post = (id, username, title, content, theme, nickname) => ({type: BRING_POST, id, username, title, content, theme, nickname})
export const remove_post = (id) => ({type: REMOVE_POST, id})
export const modal_mode = (modal) => ({type: MODAL_MODE, modal})




// 스테이트
const initialState = {

    id: '',
    username: '',
    title: '',
    content: '',
    theme: '',
    nickname: '',

    postings: postInfos,

    modal: false

}




let cnt = postInfos.length;
let newData = []


// 리듀서
export const write = handleActions({

    // postings는 빼고요
    [INITIALIZE] : (state, actions) => ({
        ...state,
        username: '',
        title: '',
        content: '',
    }),

    [CHANGE_TITLE] : (state, actions) => ({
        ...state,
        title: actions.title
    }),

    [CHANGE_CONTENT] : (state, actions) => ({
        ...state,
        content: actions.content
    }),

    [CHANGE_THEME] : (state, actions) => ({
        ...state,
        theme: actions.theme
    }),

    [CREATE_POST] : (state, actions) => {

        cnt++

        const post = {
            id: cnt,
            username: actions.username,
            title: actions.title,
            content: actions.content,
            nickname: actions.nickname,
            theme: actions.theme
        }

        return {
            ...state,
            postings: [post, ...state.postings]
        }

    },

    [EDIT_POST] : (state, actions) => {

        let newList = state.postings.filter(item=>item.id !== actions.id)
        // 포스팅데이터에아이디랑 액션아이디랑 같지않은거

        let newIdx = state.postings.indexOf(...state.postings.filter(item=>item.id === actions.id))
        // 수정할 포스트의 인덱스번호

        newData = [...newList.slice(0, newIdx),
            {
            username: actions.username,
            title: actions.title,
            content: actions.content,
            id: state.id,
            theme: actions.theme,
            nickname: actions.nickname
            },
            ...newList.slice(newIdx)]

        return {
            ...state,
            postings: newData
        }
    },

    [NEW_POST] : (state, actions) => {

        return {
            ...state,
            content: actions.content
        }
    },

    [NEW_TITLE] : (state, actions) => {

        // console.log("제발", state.title)
        return {
            ...state,
            title: actions.title,
            id: actions.id
        }
    },

    [NEW_THEME] : (state, actions) => {

        return {
            ...state,
            theme: actions.theme
        }
    },

    [BRING_POST] : (state, actions) => ({
        ...state,
        id: actions.id,
        username: actions.username,
        title: actions.title,
        content: actions.content,
        theme: actions.theme,
        nickname: actions.nickname
        // 액션들 받음
    }),

    [REMOVE_POST] : (state, actions) => {

        let removeAndLeftover = state.postings.filter((item)=>item.id!==actions.id)

        return {
            ...state,
            postings: removeAndLeftover
        }
    },

    [MODAL_MODE] : (state, actions) => {

        return {
            ...state,
            modal: actions.modal
        }
    }


}, initialState)
