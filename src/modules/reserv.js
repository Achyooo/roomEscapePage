import { reservationDatas } from "../datas/reservationDatas"


// 타입
const SUBMIT_RESERVATION_REGISTER = "reservation/SUBMIT_RESERVATION_REGISTER";
const SUBMIT_RESERVATION_LOGIN = "reservation/SUBMIT_RESERVATION_LOGIN";
const MODAL_MODE = "reservation/MODAL_MODE";
const REMOVE_RESERVATION = "reservation/REMOVE_RESERVATION";


// 액션...
export const submit_reservation_register = (theme, date, time, clientName, clientPhone, clientPw, perCost, numOfPeople, totalCost) => ({
    type: SUBMIT_RESERVATION_REGISTER, theme, date, time, clientName, clientPhone, clientPw, perCost, numOfPeople, totalCost
})

export const submit_reservation_login = (clientName, clientPhone, clientPw) => ({
    type: SUBMIT_RESERVATION_LOGIN, clientName, clientPhone, clientPw
})

export const modal_mode = (modal) => ({type:MODAL_MODE, modal})

export const remove_reservation = (theme, date, time) => ({
  type:REMOVE_RESERVATION, theme, date, time
})



// 스테이트
const initialState = {
    reservationLook: {
        theme: "",
        date: "",
        time: "",
        clientName: "",
        clientPhone: "",
        clientPw: "",
        perCost: "",
        numOfPeople: "",
        totalCost: ""
    },
    reservation: {
        theme: "",
        date: "",
        time: "",
        clientName: "",
        clientPhone: "",
        clientPw: "",
        perCost: "",
        numOfPeople: "",
        totalCost: ""
    },

    list: reservationDatas,

    error: null,

    modal: false

}




let newList = [...reservationDatas];




// 리듀서
export const reserv = (state=initialState, actions) => {

    switch(actions.type) {

        case SUBMIT_RESERVATION_REGISTER :

        //   console.log("개빡침", actions.clientName, actions.clientPhone, actions.clientPw)
          
          newList.push({theme: actions.theme,
                        date: actions.date,
                        time: actions.time,
                        clientName: actions.clientName,
                        clientPhone: actions.clientPhone,
                        clientPw: actions.clientPw,
                        perCost: actions.perCost,
                        numOfPeople: actions.numOfPeople,
                        totalCost: actions.totalCost
                        })

          // console.log(newList) // 저것들... 리스트에 들어갔나 확인

          return {
            ...state,
            reservationLook: {theme: actions.theme,
                              date: actions.date,
                              time: actions.time,
                              clientName: actions.clientName,
                              clientPhone: actions.clientPhone,
                              clientPw: actions.clientPw,
                              perCost: actions.perCost,
                              numOfPeople: actions.numOfPeople,
                              totalCost: actions.totalCost}, 
            list: newList
          }


        case SUBMIT_RESERVATION_LOGIN :

          newList.filter((item)=>
                          item.clientName === actions.clientName &&
                          item.clientPhone === actions.clientPhone &&
                          item.clientPw === actions.clientPw &&
                          item.theme &&
                          item.date &&
                          item.time &&
                          item.perCost &&
                          item.numOfPeople &&
                          item.totalCost)


          return {
            ...state,
            reservationLook: {theme: actions.theme,
                              date: actions.date,
                              time: actions.time,
                              clientName: actions.clientName,
                              clientPhone: actions.clientPhone,
                              clientPw: actions.clientPw,
                              perCost: actions.perCost,
                              numOfPeople: actions.numOfPeople,
                              totalCost: actions.totalCost}, 
            list: newList
          }

        
        case MODAL_MODE :
          return {
            ...state,
            modal: actions.modal
          }


        
        case REMOVE_RESERVATION : 

        console.log("이전 예약 상태 리스트", newList) // 현재 예약 상태

        newList = newList.filter((r)=>
          !(r.theme === actions.theme &&
            r.date === actions.date &&
            r.time === actions.time
          )
        );

        console.log("지운 후 예약 상태 리스트", newList) // 지워진 예약 상태

          return {
            ...state,
            list: newList
          }


        default:
            return state;

    }

}