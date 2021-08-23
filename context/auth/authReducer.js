import { REGISTER_SUCCESS, REGISTER_ERROR, AUTH_SUCCESS, AUTH_ERROR, USER_AUTHENTICATED, LOGOUT, CLEAN_ALERT }from '../../util/constants';
export default (state, action) => {
    switch(action.type){
        case REGISTER_SUCCESS:
        case REGISTER_ERROR:
        case AUTH_ERROR:
            return{
                ...state,
                msg: action.payload
            }
        case AUTH_SUCCESS:
            localStorage.setItem('sendup_token', action.payload);
            return{
                ...state,
                token: action.payload,
                authenticated: true
            }
        case USER_AUTHENTICATED:
            return{
                ...state,
                user: action.payload,
                authenticated: true
            }
        case LOGOUT:
            localStorage.removeItem('sendup_token');
            return{
                ...state,
                user: null,
                token: null,
                authenticated: null
            }
        case CLEAN_ALERT:
            return{
                ...state,
                msg: null
            }
        default:
            return state;
    }
}