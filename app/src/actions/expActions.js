import axios from "axios";
import getBearerToken from "utils/getBearerToken";
import {
    EXPS_FETCH,
    EXPS_FETCH_SUCCESS,
    EXPS_FETCH_FAILURE
} from './types';

const EXPS_URL = "http://localhost/resume-builder/public/api/v0/exps";

export function fetchExps() {
    return function (dispatch, getState) {
        dispatch({type: EXPS_FETCH});
        axios.get(
            EXPS_URL,
            {
                headers: {
                    Authorization: getBearerToken(getState())
                }
            }
        ).then(response => {
            dispatch({type: EXPS_FETCH_SUCCESS, payload: response.data})
        }).catch(err => {
            dispatch({type: EXPS_FETCH_FAILURE, payload: err})
        })
    }
}