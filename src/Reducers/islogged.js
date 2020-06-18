const loggedReducer = (state = false, action) =>{
    switch(action.type){
        case 'SIGN_APP':
            return !state;
        default:
            return state;
    }
}

export default loggedReducer;   