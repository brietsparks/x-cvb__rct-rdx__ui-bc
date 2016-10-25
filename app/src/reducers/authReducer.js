import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    AUTH_ERROR,
    PROTECTED_TEST,
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    message: '',
    content: '',
    isAuthenticating: false,
    authenticated: false,
    user: null
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH_LOGIN:
            return { ...state,
                isAuthenticating: true
            };

        case AUTH_LOGIN_SUCCESS:
            return { ...state,
                error: '',
                message: '',
                authenticated: true,
                user: action.payload,
                isAuthenticating: false
            };

        case AUTH_LOGIN_FAILURE:
            return { ...state,
                message: 'Invalid Credentials',
                isAuthenticating: false
            };

        case AUTH_LOGOUT:
            return { ...state,
                authenticated: false
            };

        case AUTH_ERROR:
            return { ...state,
                error: action.payload
            };

        case PROTECTED_TEST:
            return { ...state,
                content: action.payload
            };
    }

    return state;
}