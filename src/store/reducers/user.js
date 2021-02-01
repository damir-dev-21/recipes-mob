import { SET_USER_DATA } from "../types"

const initialState = {
    data:{name:'Anonim',sex:{title:'Men'},email:'unknow@mail.ru',password:'unknow'},
    isReg:false
}

export default function userReducer(state=initialState,action){
    switch(action.type){
        case SET_USER_DATA:
            return{
                ...state,
                data:action.data,
                isReg:true
            }
        default:
            return state
    }
}