import {UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, CREATE_LINK_SUCCESS,
    SHOW_ALERT, CLEAN_STATE, ADD_PASS, ADD_DOWNLOADS }from '../../util/constants';
export default (state, action) => {
    switch(action.type){
        case SHOW_ALERT:
            return {
                ...state,
                msg_file: action.paload
            }
        case UPLOAD_FILE:
            return{
                ...state,
                loading: true
            }
        case UPLOAD_FILE_SUCCESS:
            return{
                ...state,
                name: action.payload.name,
                sourceName: action.payload.sourceName,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return{
                ...state,
                msg_file: action.payload,
                loading: null
            }
        case CREATE_LINK_SUCCESS:
            return{
                ...state,
                url: action.payload
            }
        case CLEAN_STATE:
            return{
                ...state,
                msg_file: '',
                name: '',
                sourceName: '',
                loading: null,
                downloads: 1,
                password: '',
                author: null,
                url: ''
            }
        case ADD_PASS:
            return{
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return{
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
}