import {
    EXPS_FETCH,
    EXPS_FETCH_SUCCESS,
    EXPS_FETCH_FAILURE,
    EXP_MODIFY_FIELD,
    EXP_APPEND_NEW_CHILD,
    EXP_SAVE,
    EXP_SAVE_SUCCESS,
    EXP_SAVE_FAILURE
} from '../actions/types';

import 'lodash';

const INITIAL_STATE = {
    exps: [],
    fetching: false,
    fetched: false,
    error: null,
    saving: false,
    saved: false
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
            const exps = action.payload;

            _.each(exps, exp => addHashIds(exp));

            return {...state,
                fetching: false,
                fetched: true,
                exps: exps
            }
        }
        case EXPS_FETCH_FAILURE: {
            return {...state,
                fetching: false,
                fetched: false
            }
        }
        case EXP_MODIFY_FIELD: {
            const newState = { ...state };
            const exps = _.cloneDeep(state.exps);
            const exp = findExp(action.payload.hashId, exps);

            exp[action.payload.field] = action.payload.value;
            newState.exps = exps;

            return newState;
        }

        case EXP_SAVE: {
            return { ...state,
                saving: true,
                saved: false
            };
        }

        case EXP_SAVE_SUCCESS: {
            const newState = { ...state };

            const exps = _.cloneDeep(state.exps);

            let exp = findExp(action.payload.hashId, exps);
            exp = { ...action.payload.data };

            newState.exps = exps;
            newState.saving = false;
            newState.saved = true;

            return newState;
        }

        case EXP_SAVE_FAILURE: {
            return { ...state,
                saving: false,
                saved: false
            };
        }

        case EXP_APPEND_NEW_CHILD: {
            const newState = { ...state };
            const exps = _.cloneDeep(state.exps);
            const hashId = action.payload.hashId;
            const parent = findExp(hashId, exps);

            if (!parent.children) {
                parent.children = [];
            }

            parent.children.unshift( {
                children: [],
                explanation: null,
                hashId: tempHashId(),
                id: null,
                parent_id: parent.id,
                priority: 0,
                summary: null,
                title: null,
                type: null,
                user_id: action.payload.user_id
            });

            newState.exps = exps;

            return newState;

        }
    }

    return state;

}

function findExp(hashId, exps) {
    let i, exp, result;
    for(i = 0; i < exps.length; i++) {
        exp = exps[i];
        if (exp.hashId === hashId) {
            return exp;
        }
        const children = exp.children;
        if (children && children.length > 0) {
            result = findExp(hashId, children);
            if (result) {
                return result;
            }
        }
    }
}

function addHashIds(exp) {
    exp.hashId = hash(String(exp.id));

    if(exp.children) {
        _.each(exp.children, child => addHashIds(child));
    }
}

function hash(str) {
    var hash = 5381,
        i    = str.length

    while(i)
        hash = (hash * 33) ^ str.charCodeAt(--i)

    return hash >>> 0;
}

function tempHashId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}