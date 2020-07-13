export const INITIAL_STATE = {
    login: false,
    token: null,
    user: null,
};

const loggedReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SIGN_APP':
            state.login = action.login;
            state.token = action.token;
            state.user = action.user;

            return state;
        default:
            return state;
    }
}

export default loggedReducer;   