const testReducer = (state= "test", action) => {
    switch(action.type) {
        case "UP":
            return state + 'UP'
        case "DOWN":
            return state + 'DOWN'
        default:
            return state 
    }
}


export default testReducer