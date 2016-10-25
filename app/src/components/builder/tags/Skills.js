import React from "react";

import { connect } from "react-redux"

import Skill from "./tag/Skill";

import { fetchSkills, addSkill } from "../../../actions/skillsActions";

// import Tag from "./Tag";
// import * as SkillActions from "../../../actions/skillsActions";
// import SkillsStore from "../../../stores/SkillsStore";


@connect((store) => {
    return {
        skills: store.skills.skills
    };
})
export default class Skills extends React.Component {
    fetchSkills() {
        this.props.dispatch(fetchSkills())
    }

    addSkill(e) {
        e.preventDefault();
        this.props.dispatch(addSkill(title))
    }

    render() {
        const { skills } = this.props;
        // if (!skills.length) {
        //     return <button onClick={this.fetchSkills.bind(this)}>load skills</button>
        // }
        const mappedSkills = skills.map(skill => <Skill
            key={skill.id}
            {...skill}
        />);
        return (
            <div>
                <h3>Skills</h3>
                <form onSubmit={this.addSkill.bind(this)}>
                    <label>Add Skill: </label>
                    <input ref="newSkill" type="text" />
                    <input type="submit" value="Add"/>
                </form>
                <ul>
                    {mappedSkills}
                </ul>
            </div>
        );
    }
}