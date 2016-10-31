import React from "react";

import { connect } from "react-redux"

@connect((store) => {
    return { };
})
export default class Exp extends React.Component {
    render() {
        const props = this.props;
        const children = this.showChildren();
        return (
            <div>
                <label>Title: </label>
                <input ref="title" type="text" value={props.title}/>

                <label>Type: </label>
                <select>
                    <option>Employment</option>
                    <option>Position</option>
                    <option>Project</option>
                    <option>Contribution</option>
                    <option>Task</option>
                    <option>Other</option>
                </select>

                <label>Recurring: </label>
                <input type="checkbox" value={props.recurring}/>

                <label>Short Summary: </label>
                <input ref="summary" type="text" value={props.summary}/>

                <label>Long Summary: </label>
                <input ref="explanation" type="text" value={props.explanation}/>

                {/*<input*/}
                    {/*onClick={ this.addSkill.bind(this) }*/}
                    {/*type="submit" value="Add"*/}
                {/*/>*/}

                <div>
                    {children}
                </div>

            </div>
        );
    }

    showChildren() {
        const exps = this.props.children;

        return exps.map(exp =>
            <Exp
                key={exp.id}
                {...exp}
            />
        );
    }
}