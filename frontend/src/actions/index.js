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
export function setAuthentification(isLoggedIn) {
    return {
        type: SET_AUTHENTIFICATION,
        payload: isLoggedIn
    };
}

export function incrementActionCount() {
    return {
        type: INCREMENT_ACTION_COUNT
    };
}

export function addRessources() {
    return {
        type: ADD_RESSOURCES
    }
}

export function signinUser({email, password}, history) {
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

export function signoutUser() {
    return function(dispatch) {
        dispatch(setAuthentification(false))
        localStorage.removeItem("token");
    }
}

export function signupUser({email, password}, history) {
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

export function getSecretRessource() {
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

export function parseError(errorMessage) {
    return {
        type: PARSE_ERROR,
        payload: errorMessage
    }
}

export function resetError() {
    return {
        type: RESET_ERROR
    }
}