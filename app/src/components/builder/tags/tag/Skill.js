import React from "react";

import { connect } from "react-redux"

// import { fetchSkills } from "../../../actions/skillsActions";
// @connect((store) => {
//     return {
//         skills: store.skills.skills,
//     };
// })

export default class Skills extends React.Component {
    render() {
        return (
            <div class="skill">
                <p>{this.props.title}</p>
            </div>
        );
    }
}