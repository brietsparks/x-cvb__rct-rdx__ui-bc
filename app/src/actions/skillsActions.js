import axios from "axios";
import getBearerToken from "utils/getBearerToken";
import {
    SKILL_ADD,
    SKILL_ADD_SUCCESS,
    SKILL_ADD_FAILURE,

    SKILLS_FETCH,
    SKILLS_FETCH_SUCCESS,
    SKILLS_FETCH_FAILURE,

    SKILL_DELETE,
    SKILL_DELETE_SUCCESS,
    SKILL_DELETE_FAILURE

} from './types';

const SKILLS_URL = "http://localhost/resume-builder/public/api/v0/user/skills";

export function fetchSkills() {
    return function (dispatch, getState) {
        dispatch({type: SKILLS_FETCH});
        axios.get(
            SKILLS_URL,
            {
                headers: {
                    Authorization: getBearerToken(getState())
                }
            }
        ).then((response) => {
            // console.log(response.data);
            dispatch({type: SKILLS_FETCH_SUCCESS, payload: response.data})
        }).catch((err) => {
            dispatch({type: SKILLS_FETCH_FAILURE, payload: err})
        })
    }
}

export function addSkill(title) {
    return function (dispatch, getState) {
        dispatch({type: SKILL_ADD});
        axios.post(
            SKILLS_URL,
            {title},
            {
                headers: {
                    Authorization: getBearerToken(getState())
                }
            }
        ).then(response => {
            // console.log(response.data);
            dispatch({type: SKILL_ADD_SUCCESS, payload: response.data})
        }).catch((err) => {
            dispatch({type: SKILL_ADD_FAILURE, payload: err})
        })
    }
}

export function deleteSkill(id) {
    return function (dispatch, getState) {
        dispatch({type: SKILL_DELETE});
        axios.delete(
            SKILLS_URL,
            {id},
            {
                headers: {
                    Authorization: getBearerToken(getState())
                }
            }
        ).then(response => {
            dispatch({type: SKILL_DELETE_SUCCESS, payload: response.data})
        }).catch((err) => {
            dispatch({type: SKILL_DELETE_FAILURE, payload: err})
        })
    }
}

//
// export function updateSkill(id, text) {
//     return {
//         type: 'UPDATE_SKILL',
//         payload: {
//             id,
//             text,
//         },
//     }
// }
//
// export function deleteSkill(id) {
//     return { type: 'DELETE_SKILL', payload: id}
// }
