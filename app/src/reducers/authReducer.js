import {
    AUTH_USER,
    AUTH_FAILURE,
    UNAUTH_USER,
    AUTH_ERROR,
    PROTECTED_TEST,
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    message: '',
    content: '',
    authenticated: false,
    user: null
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', message: '', authenticated: true, user: action.payload };
        case AUTH_FAILURE:
            return { ...state, message: 'Invalid Credentials'};
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case PROTECTED_TEST:
            return { ...state, content: action.payload };
    }

    return state;
}