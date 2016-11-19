import {
    EXPS_FETCH,
    EXPS_FETCH_SUCCESS,
    EXPS_FETCH_FAILURE,
    EXP_MODIFY_FIELD,
    EXP_APPEND_NEW_CHILD,
    EXP_SAVE,
    EXP_SAVE_SUCCESS,
    EXP_DELETE,
    EXP_DELETE_SUCCESS,
    EXP_DELETE_FAILURE,
    EXP_SAVE_FAILURE
} from '../actions/types';

import 'lodash';

const INITIAL_STATE = {
    exps: [],
    hasRootEgg: false,
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
            let exps = action.payload;

            _.each(exps, exp => addHashIds(exp));

            // exps = sortExps(exps);

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

            if(_.isArray(exp[action.payload.field])) {
                exp[action.payload.field] = _.cloneDeep(action.payload.value);
            } else {
                exp[action.payload.field] = action.payload.value;
            }

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
            const newState = { ...state,
                saving: false,
                saved: true
            };

            const exps = _.cloneDeep(state.exps);
            let exp = findExp(action.payload.hashId, exps);

            exp.id = action.payload.id;
            exp.hashId = action.payload.hashId;

            if (exp.parent_id) {
                let parent = findExp(exp.parent_id, exps, 'id');
                parent.hasEgg = false;
            } else {
                newState.hasRootEgg = false;
            }

            newState.exps = exps;

            return newState;
        }

        case EXP_SAVE_FAILURE: {
            return { ...state,
                saving: false,
                saved: false
            };
        }

        case EXP_DELETE: {
            return { ...state,
                deleting: true,
                deleted: false
            };
        }

        case EXP_DELETE_SUCCESS: {
            const newState = { ...state,
                deleting: false,
                deleted: false
            };

            const exps = _.cloneDeep(state.exps);
            const exp = findExp(action.payload.hashId, exps);
            let parentExps;
            let index;

            if (exp.parent_id) {
                parentExps = findExp(exp.parent_id, exps, 'id').children;
            } else {
                parentExps = exps;
            }

            index = parentExps.indexOf(exp);
            if (index !== -1) {
                parentExps.splice(index, 1);
            }

            newState.exps = exps;

            return newState;
        }

        case EXP_DELETE_FAILURE: {
            return { ...state,
                deleting: false,
                deleted: false
            };
        }

        case EXP_APPEND_NEW_CHILD: {
            const newState = { ...state };
            const exps = _.cloneDeep(state.exps);
            let parent;
            let children;
            let parentId;

            const hashId = action.payload.hashId;
            if (hashId) {
                parent = findExp(hashId, exps);
                parent.hasEgg = true;
                if (!parent.children) {
                    parent.children = [];
                }
                children = parent.children;
                parentId = parent.id;
            } else {
                newState.hasRootEgg = true;
                children = exps;
            }

            const nextId = _.first(children) ? _.first(children).id : null;

            // todo: why newExp is not defined?
            // const newExp = newExp(action.payload.user_id, parentId);
            const newExp = {
                children: [],
                explanation: null,
                hashId: tempHashId(),
                id: null,
                parent_id: parentId,
                next_id: nextId,
                skills: [],
                summary: null,
                title: null,
                type: null,
                updated_at: null,
                created_at: null,
                user_id: action.payload.user_id,
                uncreatedChild: false
            };

            children.unshift(newExp);

            newState.exps = exps;

            // console.log(newState);

            return newState;

        }
    }

    return state;
}

function findExp(key, exps, keyName) {
    keyName = keyName || 'hashId';

    let i, exp, result;
    for(i = 0; i < exps.length; i++) {
        exp = exps[i];
        if (exp[keyName] === key) {
            return exp;
        }
        const children = exp.children;
        if (children && children.length > 0) {
            result = findExp(key, children, keyName);
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

function sortExps(exps) {
    const anchor = _.find(exps, exp => exp.next_id === null);
    anchor.rank = 0;

    setRanks(exps, anchor, anchor.rank);

    _.sortBy(exps, 'rank');
}

function setRanks(exps, currentExp, rank) {
    if(currentExp.children && currentExp.children.length > 0) {
        sortExps(currentExp.children);
    }

    const prevExp = _.find(exps, exp => exp.next_id === currentExp.id);

    if (prevExp) {
        prevExp.rank = rank + 1;
        setRanks(exps, prevExp, prevExp.rank);
    }
}