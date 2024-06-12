// index.js

import { combineReducers } from "redux";

import { auth } from "./auth";
import { postList } from "./postList";
import { write } from "./write";
import { reserv } from "./reserv";





export const rootReducers = combineReducers({
    auth,
    postList,
    write,
    reserv
})