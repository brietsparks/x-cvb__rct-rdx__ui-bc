import axios from "axios";

import {
    SKILL_ADD,
    SKILLS_FETCH
} from './types';

const SKILLS_URL = "http://localhost/resume-builder/public/api/v0/user/skills";

export function fetchSkills() {
    return function(dispatch) {
        // dispatch({type: "FETCH_SKILLS}", payload: response});
        axios.get(SKILLS_URL)
            .then((response) => {
                dispatch({type: "FETCH_SKILLS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_SKILLS_REJECTED", payload: err})
            })
    }
}

export function addSkill(title) {
    return function (dispatch) {
        axios.post(`${SKILLS_URL}`, {title}, { Authorization: 'Bearer ' + token })
            .then(response => {
                console.log(response.data);
                dispatch( {type: 'FETCH_SKILLS' })
            })
            .catch((err) => {
                dispatch({type: "ADD_SKILL_REJECTED", payload: err})
            })
    }

    return {
        type: 'ADD_SKILL',
        payload: {
            title
        },
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
