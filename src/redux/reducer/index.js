import cartReducer from './cartReducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
	cart: cartReducer,
})

export default rootReducers;