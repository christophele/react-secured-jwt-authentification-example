import {ADD_RESSOURCES, PARSE_MESSAGE} from '../actions/action-types';

const initialState = {
    ressourceList: [0],
    message: ''
}

export default function RessourcesReducer (state = initialState, action) {
    switch(action.type) {
        case ADD_RESSOURCES: 
            return {
                ressourceList: [...state.ressourceList, state.ressourceList[state.ressourceList.length-1] + 1]
            }
        case PARSE_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}