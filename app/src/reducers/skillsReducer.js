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
} from '../actions/types';

export default function reducer(state={
    skills: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case SKILLS_FETCH: {
            return {...state,
                fetching: true,
                fetched: false
            }
        }
        case SKILLS_FETCH_FAILURE: {
            return {...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
        }
        case SKILLS_FETCH_SUCCESS: {
            return {...state,
                fetching: false,
                fetched: true,
                skills: action.payload,
            }
        }
        
        case SKILL_ADD: {
            return {...state,
                adding: true,
                added: false
            }
        }

        case SKILL_ADD_SUCCESS: {
            return {...state,
                adding: false,
                added: true,
                skills: [...state.skills,
                    action.payload
                ]
            }
        }

        case SKILL_ADD_FAILURE: {
            return {...state

            }
        }

        case SKILL_DELETE: {
            return {...state,
                deleting: true,
                deleted: false
            }
        }

        case SKILL_DELETE_SUCCESS: {
            console.log(state);
            return {
                deleting: false,
                deleted: true,
                skills: [...state,
                ]
            }
        }

        case SKILL_DELETE_FAILURE: {
            return {

            }
        }


    }

    return state
}