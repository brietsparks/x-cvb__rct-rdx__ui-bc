import cookie from "react-cookie";
import React from "react";

import { connect } from "react-redux"

import { loginUser, authenticateToken } from "actions/authActions";

@connect((store) => {
    return {
        authenticated: store.auth.authenticated,
        message: store.auth.message
    };
})
export default class Login extends React.Component {
    loginUser(e) {
        e.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        this.props.dispatch(loginUser({email, password}));
    }

    userDidRefresh() {
        return !this.props.authenticated && cookie.load('token');
    }

    render() {
        if (this.userDidRefresh()) {
            const token = cookie.load('token');
            this.props.dispatch(authenticateToken({token}));
        }

        if (this.props.message) {
            var messageElement =  <p>{ this.props.message }</p>;
        }

        return (
            <div id="login">
                <form onSubmit={this.loginUser.bind(this)}>
                    <label>Email</label>
                    <input ref="email" type="text" />

                    <label>Password</label>
                    <input ref="password" type="password" />

                    <input type="submit" value="Login"/>

                    { messageElement }
                </form>
            </div>
        )
    }
}