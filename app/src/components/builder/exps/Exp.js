import React from "react";
import Select from 'react-select';
import { connect } from "react-redux";
import {
    saveExp,
    deleteExp,
    modifyField,
    moveUp,
    moveDown,
    appendNewChildExp
} from "actions/expActions";

@connect((store) => {
    return {};
})
export default class Exp extends React.Component {
    render() {
        const props = this.props;
        const skills = this.showSkills();
        const children = this.showChildren();

        return (
            <div class="exp" style={this.expStyle}>
                <p>Exp</p>

                <div>
                    <label>Title*: </label>
                    <input ref="title" type="text" value={props.title} onChange={this.handleInputChange.bind(this, 'title')}/>
                </div>

                <label>Type*: </label>
                <select ref="type" value={props.type} onChange={this.handleInputChange.bind(this, 'type')}>
                    <option value=""></option>
                    <option value="Employment">Employment</option>
                    <option value="Position">Position</option>
                    <option value="Project">Project</option>
                    <option value="Contribution">Contribution</option>
                    <option value="Task">Task</option>
                    <option value="Other">Other</option>
                </select>

                <div>
                    <label>Recurring: </label>
                    <input type="checkbox" checked={this.parseRecurring(props.recurring)} onChange={this.handleInputChange.bind(this, 'recurring')}/>
                </div>

                <div>
                    <label>Short Summary: </label>
                    <input ref="summary" type="text" value={props.summary} onChange={this.handleInputChange.bind(this, 'summary')}/>
                </div>

                <div>
                    <label>Long Summary: </label>
                    <input ref="explanation" type="textarea" value={props.explanation} onChange={this.handleInputChange.bind(this, 'explanation')}/>
                </div>


                <div>
                    {skills}
                </div>

                <div>
                    <button onClick={this.save.bind(this)}>Save</button>
                    {this.showAppendNewChild()}
                    <button onClick={this.remove.bind(this)}>Delete</button>
                </div>

                <div>
                    {this.showMove()}
                </div>

                <div class="exp-children">
                    {children}
                </div>
            </div>
        );
    }

    showMove() {
        if (this.props.id) {
            return (
                <div>
                    <button onClick={this.moveUp.bind(this)}>Move Up</button>
                    <button onClick={this.moveDown.bind(this)}>Move Down</button>
                </div>
            );
        }
    }
    moveUp(e) {
        this.props.dispatch(moveUp({ props: this.props }))
    }

    moveDown(e) {
        this.props.dispatch(moveDown({ props: this.props }))
    }

    save(e) {
        this.props.dispatch(saveExp({ props: this.props }));
    }

    remove(e) {
        this.props.dispatch(deleteExp({ props: this.props }));
    }

    showAppendNewChild() {
        if (this.props.id) {
            var opts = {};
            if (this.props.hasEgg) {
                opts['disabled'] = 'disabled';
            }

            return <input
                onClick={ this.appendNewChild.bind(this) }
                type="submit" value="Add"
                {...opts}
            />
        }
    }

    appendNewChild() {
        this.props.dispatch( appendNewChildExp({ hashId: this.props.hashId }) );
    }

    handleInputChange(field, event) {
        let value;

        switch (event.target.type) {
            case "checkbox":
                value = event.target.checked;
                break;
            default:
                value = event.target.value;
        }

        this.props.dispatch(
            modifyField({
                hashId: this.props.hashId,
                field:  field,
                value:  value
            })
        );
    }

    showSkills() {
        const skills = this.getSkillOptions(this.props.userSkills);

        return <Select
            name="form-field-name"
            options={skills}
            multi={true}
            value={this.getSkillOptions(this.props.skills)}
            onChange={this.handleSkillsSelectChange.bind(this)}
        />
    }

    getSkillOptions(skillsArray) {
        let skillOptions = [];

        if (skillsArray) {
            skillOptions = skillsArray.map(skill => {
                return { ...skill,
                    value: skill.id,
                    label: skill.title
                }
            });
        }

        return skillOptions;
    }

    handleSkillsSelectChange(skills) {
        this.props.dispatch(
            modifyField({
                hashId: this.props.hashId,
                field:  'skills',
                value:  skills
            })
        );
    }

    showChildren() {
        const exps = this.props.children;

        if (exps && exps.length > 0) {
            return exps.map(exp =>
                <Exp
                    key={exp.hashId}
                    dispatch={this.props.dispatch}
                    userSkills={this.props.userSkills}
                    {...exp}
                />
            );
        }
    }

    parseRecurring(recurring) {
        return Boolean(Number(recurring));
    }

    expStyle = {
        marginLeft: '30px'
    };
}