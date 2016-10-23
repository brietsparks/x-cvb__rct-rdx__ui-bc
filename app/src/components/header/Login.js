import cookie from "react-cookie";
import React from "react";

import { connect } from "react-redux"

import { loginUser, authenticateToken } from "../../actions/authActions";

@connect((store) => {
    return {
        message: store.auth.message
    };
})
export default class Login extends React.Component {
    componentDidMount() {
        if (cookie.load('token')) {
            const token = cookie.load('token');
            this.props.dispatch(authenticateToken({token}));
        }
    }

    loginUser(e) {
        e.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        this.props.dispatch(loginUser({email, password}));
    }

    render() {
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