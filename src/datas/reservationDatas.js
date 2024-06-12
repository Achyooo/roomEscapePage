import { themeDatas } from "./themeDatas"

export const reservationDatas = [

    {
        theme: themeDatas[0].name,
        date: "2024-06-15",
        time: themeDatas[0].availableTimes[0],
        clientName: "에휴",
        clientPhone: "01012345678",
        clientPw: "qwer",
        perCost: themeDatas[0].cost,
        numOfPeople: 2,
        totalCost: (themeDatas[0].cost)*2,
    },

    {
        theme: themeDatas[1].name,
        date: "2024-06-15",
        time: themeDatas[1].availableTimes[1],
        clientName: "ㅠㅠ",
        clientPhone: "01000000000",
        clientPw: "asdf",
        perCost: themeDatas[1].cost,
        numOfPeople: 3,
        totalCost: (themeDatas[1].cost)*3,
    },

]