export default function reducer(state={
    tools: [],
    fetching: false,
    fetched: false,
    error: null,
}, action) {
    switch (action.type) {
        case "FETCH_TOOLS": {
            return {...state, fetching: true}
        }
        case "FETCH_TOOLS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_TOOLS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                tools: action.payload,
            }
        }
    }

    return state
}