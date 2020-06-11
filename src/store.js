import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'



//Create a redux store holding the state of the app and export it
const store = createStore(
    rootReducer, 
    compose(applyMiddleware(logger),
    composeWithDevTools()), 
    
)

export default store