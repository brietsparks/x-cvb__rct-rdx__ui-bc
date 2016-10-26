import axios from "axios";
import getHeaders from "../utils/getHeaders";
import {
    SKILL_ADD,
    SKILL_ADD_SUCCESS,
    SKILL_ADD_FAILURE,

    SKILLS_FETCH,
    SKILLS_FETCH_SUCCESS,
    SKILLS_FETCH_FAILURE

} from './types';

const SKILLS_URL = "http://localhost/resume-builder/public/api/v0/user/skills";

export function fetchSkills() {
    return function (dispatch, getState) {
        dispatch({type: SKILLS_FETCH});
        axios.get(
            SKILLS_URL,
            getHeaders(getState)
        ).then((response) => {
            dispatch({type: "SKILLS_FETCH_SUCCESS", payload: response.data})
        }).catch((err) => {
            dispatch({type: "SKILLS_FETCH_FAILURE", payload: err})
        })
    }
}

export function addSkill(title) {
    return function (dispatch, getState) {
        dispatch({type: SKILL_ADD});
        axios.post(
            SKILLS_URL,
            {title},
            getHeaders(getState)
        ).then(response => {
            console.log(response.data);
            dispatch({type: 'SKILL_ADD_SUCCESS', payload: response.data})
        }).catch((err) => {
            dispatch({type: "SKILL_ADD_FAILURE", payload: err})
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
