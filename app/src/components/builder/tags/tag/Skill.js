import React from "react";

import { connect } from "react-redux"

import { deleteSkill } from "actions/skillsActions";

@connect((store) => {
    return { };
})
export default class Skill extends React.Component {
    render() {
        return (
            <li class="skill">
                <p>
                    {this.props.title}
                    <button onClick={this.deleteSkill.bind(this)}>X</button>
                </p>
            </li>
        );
    }

    deleteSkill() {
        const id = this.props.id;
        this.props.dispatch(deleteSkill(id));
    }
}