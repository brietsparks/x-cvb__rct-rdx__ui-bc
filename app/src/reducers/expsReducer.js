import {
    EXPS_FETCH,
    EXPS_FETCH_SUCCESS,
    EXPS_FETCH_FAILURE,
    EXP_MODIFY_FIELD
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
        case EXP_MODIFY_FIELD: {
            function recursivelyModify(exps, {id, field, value}) {
                for(let i = 0; i < exps.length; i++) {
                    const exp = exps[i];
                    const children = exp.children;
                    if (children && children.length > 0) {
                        recursivelyModify(exp, {id: id, field: field, value: value});
                    }
                    if (exp.id === id) {
                        exp[field] = value;
                    }
                }
            }

            const newState = { ...state };

            recursivelyModify(newState.exps, {
                id:     action.payload.id,
                field:  action.payload.field,
                value:  action.payload.value
            });

            newState.exps = [ ...newState.exps ];

            return newState;
        }
    }

    return state;

}