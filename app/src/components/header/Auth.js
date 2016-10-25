import React from "react"
import { connect } from "react-redux"

import Login from "./Login";
import Register from "./Register";

import { logoutUser } from "../../actions/authActions";

@connect((store) => {
    return {
        user: store.auth.user,
        authenticated: store.auth.authenticated
    };
})
export default class Auth extends React.Component {
    logout(e) {
        this.props.dispatch(logoutUser());
    }

    render() {
        var auth;
        if (this.props.authenticated) {
            auth =  <div>
                        <p>Logged in as {this.props.user.email}</p>
                        <a href="#" onClick={this.logout.bind(this)}>Logout</a>
                    </div>
        } else {
            auth =  <div>
                        <h2>Login</h2>
                        <Login />

                        <h2>Register</h2>
                        <Register />
                    </div>;
        }

        return auth;
    }
}