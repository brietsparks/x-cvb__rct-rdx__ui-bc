import React from "react";

import { connect } from "react-redux"

import Skill from "./tag/Skill";

import { fetchSkills, addSkill } from "actions/skillsActions";

// import Tag from "./Tag";
// import * as SkillActions from "../../../actions/skillsActions";
// import SkillsStore from "../../../stores/SkillsStore";


@connect((store) => {
    return {
        skills: store.skills.skills,
        user: store.auth.user

    };
})
export default class Skills extends React.Component {
    render() {
        // console.log(this.props.user);

        var skills = this.fetchSkills();

        // if (!skills.length) {
        //     return <button onClick={this.fetchSkills.bind(this)}>load skills</button>
        // }
        // const mappedSkills = skills.map(skill => <Skill
        //     key={skill.id}
        //     {...skill}
        // />);
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
                    {/*{mappedSkills}*/}
                </ul>
            </div>
        );
    }

    fetchSkills() {
        this.props.dispatch(fetchSkills())
    }

    addSkill(e) {
        e.preventDefault();
        const title = this.refs.newSkill.value;
        this.props.dispatch(addSkill(title))
    }
}