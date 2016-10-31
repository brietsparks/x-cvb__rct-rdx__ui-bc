import { combineReducers } from "redux"

import auth from "./authReducer"
import skills from "./skillsReducer"
import exps from "./expsReducer"
// import references from "./referencesReducer"

export default combineReducers({
    auth,
    skills,
    exps
    // references,
})
