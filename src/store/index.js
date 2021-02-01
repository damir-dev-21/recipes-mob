import {createStore,combineReducers} from 'redux';
import cartReducer from './reducers/cart'
import userReducer from './reducers/user'

const reducers = combineReducers({
    cart:cartReducer,
    user:userReducer
})

export default createStore(reducers)