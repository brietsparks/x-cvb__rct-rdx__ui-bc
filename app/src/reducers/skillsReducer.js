import {
    SKILL_ADD,
    SKILL_ADD_SUCCESSFUL,

} from '../actions/types';

export default function reducer(state={
    skills: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_SKILLS": {
            console.log("fetching");
            return {...state, fetching: true}
        }
        case "FETCH_SKILLS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_SKILLS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                skills: action.payload,
            }
        }
        
        case "ADD_SKILL": {
            return {
                ...state,
                skills: [...state.skills, action.payload],
            }
        }
    }

    return state
}