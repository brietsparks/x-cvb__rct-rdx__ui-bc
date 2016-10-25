import React from "react";

import { connect } from "react-redux"

// import { fetchSkills } from "../../../actions/skillsActions";
// @connect((store) => {
//     return {
//         skills: store.skills.skills,
//     };
// })

export default class Skill extends React.Component {
    render() {
        return (
            <li class="skill">
                <p>{this.props.title}</p>
            </li>
        );
    }
}