import React from "react";

import Header from "./Header";
import Tags from "./builder/Tags";

import { connect } from "react-redux";

@connect((store) => {
    return {
        skills: store.skills.skills,
        user: store.auth.user

    };
})
export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <Header />
                {this.showMain()}
            </div>
        )
    }

    showMain() {
        if(this.props.user) {
            return <Tags />
        }
    }
}