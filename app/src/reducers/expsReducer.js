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
    EXP_SAVE_FAILURE,
    EXP_MOVE_UP,
    EXP_MOVE_DOWN
} from '../actions/types';

import 'lodash';
import ExpTree from 'utils/ExpTree';

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
            const newState = {...state,
                fetching: false,
                fetched: true
            };

            const tree = makeExpTree(action.payload, newState);

            newState.exps = tree.addHashIds().getTree();

            return newState;
        }

        case EXPS_FETCH_FAILURE: {
            return {...state,
                fetching: false,
                fetched: false
            }
        }

        case EXP_MODIFY_FIELD: {
            const newState = { ...state };
            const tree = makeExpTree(newState.exps, newState);

            tree.changeFieldValue(
                action.payload.hashId,
                action.payload.field,
                action.payload.value
            );

            newState.exps = tree.getTree();

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
            const tree = makeExpTree(newState.exps, newState);

            tree.assignId(
                action.payload.hashId,
                action.payload.id
            );

            newState.exps = tree.getTree();

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
            const tree = makeExpTree(newState.exps, newState);

            // todo: needs to return results from SinglyLinkedList
            tree.remove(action.payload.hashId);

            newState.exps = tree.getTree();

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
            const tree = makeExpTree(newState.exps, newState);

            tree.appendNew(
                action.payload.user_id,
                action.payload.hashId
            );

            newState.exps = tree.getTree();

            return newState;
        }

        case EXP_MOVE_UP: {

        }

        case EXP_MOVE_DOWN: {

        }

    }

    return state;
}

function makeExpTree(exps, state) {
    return new ExpTree(exps, state.hasRootEgg)
}