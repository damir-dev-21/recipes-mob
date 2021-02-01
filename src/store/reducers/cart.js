import { ADD_CART } from "../types";

const initialState = {
    cart:[],
    totalPrice:0,
    totalCount:0
}

export default function cartReducers(state = initialState,action){

    const setPrice = (price) =>{
        state.totalPrice += +price;
        return state.totalPrice
    }

    const setCount = (count) =>{
        state.totalCount += +count;
        return state.totalCount
    }

    switch(action.type){
        case ADD_CART:
            return{
                ...state,
                cart:[...state.cart,action.item],
                totalPrice:setPrice(action.item.totalPrice),
                totalCount:setCount(action.item.count)
            }
        default:
            return state;
    }
}