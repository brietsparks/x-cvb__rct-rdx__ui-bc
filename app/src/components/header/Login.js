import React from "react";



export default class Login extends React.Component {
    loginUser(e) {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        this.props.dispatch(loginUser());
    }

    render() {

        return (
            <div id="login">
                <form onSubmit={this.loginUser.bind(this)}>
                    <label>Email</label>
                    <input id="login-username" ref="username" type="text" />

                    <label>Password</label>
                    <input id="login-password" ref="password" type="password" />

                    <input type="submit" />
                </form>
            </div>
        )
    }
}