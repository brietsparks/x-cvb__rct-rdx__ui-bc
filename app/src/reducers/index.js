import { combineReducers } from "redux"

import auth from "./authReducer"
import skills from "./skillsReducer"
// import references from "./referencesReducer"

export default combineReducers({
    auth,
    skills,
    // references,
})
