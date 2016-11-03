import React from "react";

import { connect } from "react-redux"

import Skill from "./tag/Skill";

import { fetchSkills, addSkill } from "actions/skillsActions";

@connect((store) => {
    return {
        skills: store.skills.skills,
        user: store.auth.user
    };
})
export default class Skills extends React.Component {
    componentWillMount() {
        this.fetchSkills();
    }

    render() {
        const skillElements = this.showSkills();

        return (
            <div>
                <h3>Skills</h3>
                <label>Add Skill: </label>
                <input ref="newSkill" type="text" />
                <input
                    onClick={ this.addSkill.bind(this) }
                    type="submit" value="Add"
                />

                <ul>
                    {skillElements}
                </ul>
            </div>
        );
    }

    fetchSkills() {
        this.props.dispatch(fetchSkills())
    }

    showSkills() {
        const skills = this.props.skills;

        return skills.map(skill =>
            <Skill
                key={skill.id}
                {...skill}
            />
        );
    }

    addSkill(e) {
        e.preventDefault();
        const newSkill = this.refs.newSkill;
        this.props.dispatch(addSkill(newSkill.value));
        newSkill.value = "";
    }
}