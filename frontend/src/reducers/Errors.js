import {
    PARSE_ERROR,
    RESET_ERROR
} from '../actions/action-types';

const initialState = {
    errorMessage: ''
}

export default function ErrorsReducer(state = initialState, action) {
    switch(action.type) {
        case PARSE_ERROR: 
            return {
                errorMessage: action.payload
            };
        case RESET_ERROR: 
            return {
                errorMessage: ''
            };
        default:
            return state;
    }
}
