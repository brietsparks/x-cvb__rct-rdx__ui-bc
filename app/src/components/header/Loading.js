import React from "react";

import { connect } from "react-redux"

@connect((store) => {
    return {
        isAuthenticating: store.auth.isAuthenticating
    };
})
export default class Header extends React.Component {
    busy() {
        const props = this.props;

        const busyStates = [
            props.isAuthenticating
        ];

        for (var i = 0; i < busyStates.length; i++) {
            if(busyStates[i]) {
                return true;
            }
        }

        return false;
    }

    render() {
        var result = null;
        if (this.busy()) {
            result = <p><strong>Loading...</strong></p>
        }
        return result;
    }
}
