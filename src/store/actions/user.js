import { SET_USER_DATA } from "../types"

export const setUserData = (data) =>{
    return{
        type:SET_USER_DATA,
        data
    }
}