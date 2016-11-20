import axios from "axios";
import getBearerToken from "utils/getBearerToken";
import {
    EXPS_FETCH,
    EXPS_FETCH_SUCCESS,
    EXPS_FETCH_FAILURE,
    EXP_MODIFY_FIELD,
    EXP_SAVE,
    EXP_SAVE_SUCCESS,
    EXP_SAVE_FAILURE,
    EXP_DELETE,
    EXP_DELETE_SUCCESS,
    EXP_DELETE_FAILURE,
    EXP_APPEND_NEW_CHILD,
    EXP_MOVE_UP,
    EXP_MOVE_DOWN
} from './types';
import { getDomain } from "utils/app";

const EXPS_URL = getDomain() + "/api/v0/exps";

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

export function modifyField({ hashId, field, value }) {
    return function (dispatch) {
        dispatch({type: EXP_MODIFY_FIELD, payload: { hashId, field, value }});
    }
}

export function saveExp({ props }) {
    // console.log(props);
    if (props.id) {
        return function (dispatch, getState) {
            dispatch({ type: EXP_SAVE });
            axios.patch(
                EXPS_URL + "/" + props.id,
                props,
                {
                    headers: {
                        Authorization: getBearerToken(getState())
                    }
                }
            ).then(response => {
                console.log(response.data);
                dispatch({type: EXP_SAVE_SUCCESS, payload: {...response.data, hashId: props.hashId}})
            }).catch(err => {
                dispatch({type: EXP_SAVE_FAILURE, payload: err})
            })
        }
    } else {
        return function (dispatch, getState) {
            dispatch({ type: EXP_SAVE });
            axios.post(
                EXPS_URL,
                props,
                {
                    headers: {
                        Authorization: getBearerToken(getState())
                    }
                }
            ).then(response => {
                console.log(response);
                dispatch({type: EXP_SAVE_SUCCESS, payload: {...response.data, hashId: props.hashId}})
            }).catch(err => {
                dispatch({type: EXP_SAVE_FAILURE, payload: err})
            })
        }
    }
}

export function deleteExp({ props }) {
    if (props.id) {
        return function (dispatch, getState) {
            dispatch({ type: EXP_DELETE });
            axios.delete(
                EXPS_URL + "/" + props.id,
                {
                    headers: {
                        Authorization: getBearerToken(getState())
                    }
                }
            ).then(response => {
                dispatch({type: EXP_DELETE_SUCCESS, payload: {hashId: props.hashId}})
            }).catch(err => {
                dispatch({type: EXP_DELETE_FAILURE, payload: err})
            })
        }
    } else {
        return function (dispatch) {
            return dispatch({type: EXP_DELETE_SUCCESS, payload: {hashId: props.hashId}});
        }
    }

}

export function moveUp( { props } ) {
    return function (dispatch) {
        dispatch({type: EXP_MOVE_UP, payload: { props }});
    }
}

export function moveDown( { props } ) {
    return function (dispatch) {
        dispatch({type: EXP_MOVE_DOWN, payload: { props }});
    }
}

export function appendNewChildExp({ hashId }) {
    return function (dispatch, getState) {
        const user_id = getState().auth.user.id;
        dispatch({type: EXP_APPEND_NEW_CHILD, payload: { hashId, user_id } })
    }
}