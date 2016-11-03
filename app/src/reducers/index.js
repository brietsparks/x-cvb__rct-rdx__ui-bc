import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'

import auth from "./authReducer"
import skills from "./skillsReducer"
import exps from "./expsReducer"
// import references from "./referencesReducer"

export default combineReducers({
    form: formReducer,
    auth,
    skills,
    exps
    // references,
})
