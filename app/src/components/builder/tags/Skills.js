import React from "react";

import { connect } from "react-redux"

import Skill from "./tag/Skill";

import { fetchSkills } from "../../../actions/skillsActions";

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
        console.log(this.props);
        this.props.dispatch(fetchSkills())
    }

    addSkill(title) {
        this.props.dispatch(addSkill(title))
    }

    render() {
        const { skills } = this.props;
        if (!skills.length) {
            return <button onClick={this.fetchSkills.bind(this)}>load skills</button>
        }
        const mappedSkills = skills.map(skill => <Skill
            key={skill.id}
            {...skill}
        />);
        return (
            <div>
                <h3>Skills</h3>
                <input type="text" id="add_skill_input"/><button id="add_skill_btn">Add</button>
                <ul>{mappedSkills}</ul>
            </div>
        );
    }
}