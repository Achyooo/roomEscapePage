// auth.js


// import { createAction, handleActions } from "redux-actions";
import { idPws } from "../datas/idPws"



// 타입
const CHANGE_MODE = "auth/CHANGE_MODE";
const SUBMIT_REGISTER = "auth/SUBMIT_REGISTER";
const SUBMIT_LOGIN = "auth/SUBMIT_LOGIN";
const LOGOUT_ID = "auth/LOGOUT_ID";



// 액션함수
export const change_mode = (mode) => ({type:CHANGE_MODE, mode})
export const submit_register = (username, password, nickname) => ({type:SUBMIT_REGISTER, username, password, nickname})
export const submit_login = (username, password) => ({type:SUBMIT_LOGIN, username, password})
export const logout_id = () => ({type:LOGOUT_ID})



// 스테이트
const initialState = {
    mode: "login",

    login: {
        username: "",
        password: "",
        nickname: ""
    },
    register: {
        username: "",
        password: "",
        passwordConfirm: "",
        nickname: ""
    },

    list: idPws,

    loginUsername: null,
    loginNickname: null,

    error: null
}



let newList = [...idPws];


// 리듀서
export const auth = (state=initialState, actions) => {

    switch(actions.type) {

        case CHANGE_MODE :
            return {
                ...state,
                mode: actions.mode
            }

        case SUBMIT_REGISTER :

          // console.log("하시발진짜", actions.username, actions.password)
          
          newList.push({username: actions.username,
                        password: actions.password,
                        nickname: actions.nickname})

          console.log(newList) // 회원가입아이디패스워드잘들어갔나확인함

          return {
            ...state,
            register: {username: actions.username,
                       password: actions.password,
                       nickname: actions.nickname}, 
            list: newList
          }

        case SUBMIT_LOGIN :

          let loginSuccessList = newList.filter((item)=>item.username === actions.username && item.password === actions.password && item.nickname)

          console.log(loginSuccessList)
          // newList에 있는거랑 같은거면 여기에 들어감 = 아무튼 1개 이상이 될거임
          // console.log(loginSuccessList[0].username)

          return {
            ...state,
            login: {username: actions.username, password: actions.password, nickname: actions.nickname}, 
            list: newList,
            // user: actions.username
            loginUsername: loginSuccessList[0].username,
            loginNickname: loginSuccessList[0].nickname
          }

        case LOGOUT_ID :

          return {
            ...state,
            loginUsername: null,
            loginNickname: null
          }


        default:
            return state;

    }

}