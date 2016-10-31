import {
    EXPS_FETCH,
    EXPS_FETCH_SUCCESS,
    EXPS_FETCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    exps: [],
    fetching: false,
    fetched: false,
    error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case EXPS_FETCH: {
            return {...state,
                fetching: true,
                fetched: false
            }
        }
        case EXPS_FETCH_SUCCESS: {
            return {...state,
                fetching: false,
                fetched: true,
                exps: action.payload
            }
        }
        case EXPS_FETCH_FAILURE: {
            return {...state,
                fetching: false,
                fetched: false
            }
        }
    }

    return state;

}