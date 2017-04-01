import { combineReducers } from 'redux'
import SearchReducer from './searchReducer'

const rootReducer = combineReducers({
    searchReducer: SearchReducer
})

export default rootReducer