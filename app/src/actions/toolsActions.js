import axios from "axios";

export function fetchTools() {
    return function(dispatch) {
        axios.get("http://localhost/resume-builder/public/api/tools")
            .then((response) => {
                dispatch({type: "FETCH_TOOLS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_TOOLS_REJECTED", payload: err})
            })
    }
}

// export function addTool(id, text) {
//     return {
//         type: 'ADD_TOOL',
//         payload: {
//             id,
//             text,
//         },
//     }
// }
//
// export function updateTool(id, text) {
//     return {
//         type: 'UPDATE_TOOL',
//         payload: {
//             id,
//             text,
//         },
//     }
// }
//
// export function deleteTool(id) {
//     return { type: 'DELETE_TOOL', payload: id}
// }
