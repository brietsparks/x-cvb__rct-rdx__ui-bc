import axios from "axios";

import cookie from 'react-cookie';
import {
    AUTH_USER,
    AUTH_FAILURE,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST } from './types';

const AUTH_URL = "http://localhost/resume-builder/public/api/auth";

export function loginUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${AUTH_URL}/login`, { email, password })
            .then(response => {
                console.log(response);
                if(response.data) {
                    cookie.save('token', response.data.api_token, { path: '/' });
                    dispatch({ type: AUTH_USER, payload: response.data });
                } else {
                    dispatch({ type: AUTH_FAILURE })
                }
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${AUTH_URL}/register`, { email, password })
            .then(response => {
                console.log(response);
                cookie.save('token', response.data.api_token, { path: '/' });
                dispatch({ type: AUTH_USER, payload: response.data });
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
        cookie.remove('token', { path: '/' });
    }
}

export function authenticateToken({ token }) {
    return function (dispatch) {
        axios.post(`${AUTH_URL}/authenticate`, { }, { Authorization: 'Bearer ' + token })
            .then(response => {
                console.log(response.data);
                dispatch({ type: AUTH_USER, payload: response.data });
            })
            .catch(error => {

            });
    }
}

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if(error.data.error) {
        errorMessage = error.data.error;
    } else if(error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}