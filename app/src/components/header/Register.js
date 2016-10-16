import React from "react";

import { connect } from "react-redux"

import { registerUser } from "../../actions/authActions";

@connect((store) => {
    return {

    };
})
export default class Register extends React.Component {
    registerUser(e) {
        e.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        this.props.dispatch(registerUser({email, password}));
    }
    
    render() {

        return (
            <div id="register">
                <form onSubmit={this.registerUser.bind(this)}>
                    <label>Email</label>
                    <input ref="email" type="email" />

                    <label>Password</label>
                    <input ref="password" type="password" />

                    <input type="submit" />
                </form>
            </div>
        )
    }
}