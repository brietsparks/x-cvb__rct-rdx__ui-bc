import React from "react"
import { connect } from "react-redux"

import Login from "./Login";
import Register from "./Register";


// @connect((store) => {
//     return {
//         user: store.user.user,
//         userFetched: store.user.fetched,
//     };
// })
export default class Auth extends React.Component {
    render() {
        return (
            <div>
                <h2>Login</h2>
                <Login />

                <h2>Register</h2>
                <Register />
            </div>
        )
    }
}