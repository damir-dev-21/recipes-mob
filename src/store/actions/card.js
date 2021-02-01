import { ADD_CART } from "../types"

export const addCart = (item) =>{
    return{
        type:ADD_CART,
        item
    }
}