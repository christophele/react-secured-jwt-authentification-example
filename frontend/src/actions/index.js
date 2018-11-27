import {
    SET_AUTHENTIFICATION,
    INCREMENT_ACTION_COUNT,
    ADD_RESSOURCES,
    PARSE_MESSAGE,
    PARSE_ERROR,
    RESET_ERROR
} from './action-types';
import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

// action creator
export const setAuthentification = isLoggedIn => {
    return {
        type: SET_AUTHENTIFICATION,
        payload: isLoggedIn
    };
}

export const incrementActionCount = () => {
    return {
        type: INCREMENT_ACTION_COUNT
    };
}

export const addRessources = () => {
    return {
        type: ADD_RESSOURCES
    }
}

export const signinUser = ({email, password}, history) => {
    return function(dispatch) {
        axios.post(`${BASE_URL}/signin`, {
            email,
            password
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            dispatch(setAuthentification(true));
            history.push("/ressources");
        }).catch((err) => {
            dispatch(parseError("Identifiants incorrects"));
        });
    };
}

export const signoutUser = () => {
    return function(dispatch) {
        dispatch(setAuthentification(false))
        localStorage.removeItem("token");
    }
}

export const signupUser = ({email, password}, history) => {
    return function(dispatch) {
        axios.post(`${BASE_URL}/signup`, {
            email,
            password
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            dispatch(setAuthentification(true));
            history.push("/ressources");
        }).catch((err) => {
            console.log(err);
        })
    };
}

export const getSecretRessource = () => {
    return function(dispatch) {
        axios
        .get(`${BASE_URL}/secretRessource`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        .then((res) => {
            dispatch({
                type: PARSE_MESSAGE,
                payload: res.data.result
            })
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const parseError = errorMessage => {
    return {
        type: PARSE_ERROR,
        payload: errorMessage
    }
}

export const resetError = () => {
    return {
        type: RESET_ERROR
    }
}