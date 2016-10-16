import axios from "axios";

const skillsActionsUrl = "http://localhost/resume-builder/public/api/skills";

export function fetchSkills() {
    return function(dispatch) {
        // dispatch({type: "FETCH_SKILLS}", payload: response});
        axios.get(skillsActionsUrl)
            .then((response) => {
                dispatch({type: "FETCH_SKILLS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_SKILLS_REJECTED", payload: err})
            })
    }
}

export function addSkill(title) {
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
