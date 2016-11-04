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
                let changed = false;
                for(let i = 0; i < exps.length; i++) {
                    const exp = exps[i];
                    const children = exp.children;
                    if (children && children.length > 0) {
                        const childrenChanged = recursivelyModify(exp.children, {id: id, field: field, value: value});
                        if(childrenChanged) {
                            exp.children = [ ...exp.children ];
                            changed = true;
                        }
                    }
                    if (exp.id === id) {
                        exp[field] = value;
                        changed = true;
                    }
                }

                return changed;
            }

            const newState = { ...state };

            recursivelyModify(newState.exps, {
                id:     action.payload.id,
                field:  action.payload.field,
                value:  action.payload.value
            });

            newState.exps = [ ...newState.exps ];

            console.log(newState);

            return newState;
        }
    }

    return state;

}