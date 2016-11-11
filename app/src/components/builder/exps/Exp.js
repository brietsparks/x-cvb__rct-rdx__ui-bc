import React from "react";

import { connect } from "react-redux"
import {
    saveExp,
    modifyField,
    appendNewChildExp
} from "actions/expActions";

@connect((store) => {
    return {  };
})
export default class Exp extends React.Component {
    render() {
        const props = this.props;
        const children = this.showChildren();

        return (
            <div class="exp" style={this.expStyle}>
                <p>Exp</p>

                <div>
                    <label>Title: </label>
                    <input ref="title" type="text" value={props.title} onChange={this.handleChange.bind(this, 'title')}/>
                </div>

                <label>Type: </label>
                <select ref="type" value={props.type} onChange={this.handleChange.bind(this, 'type')}>
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
                    <input type="checkbox" checked={this.parseRecurring(props.recurring)} onChange={this.handleChange.bind(this, 'recurring')}/>
                </div>

                <div>
                    <label>Short Summary: </label>
                    <input ref="summary" type="text" value={props.summary} onChange={this.handleChange.bind(this, 'summary')}/>
                </div>

                <div>
                    <label>Long Summary: </label>
                    <input ref="explanation" type="textarea" value={props.explanation} onChange={this.handleChange.bind(this, 'explanation')}/>
                </div>

                <div>
                    <button onClick={this.save.bind(this)}>Save</button>
                    {this.showAppendNewChild()}
                </div>

                <div class="exp-children">
                    {children}
                </div>
            </div>
        );
    }

    save(e) {
        this.props.dispatch(saveExp({props: this.props}));
    }

    showAppendNewChild() {
        if (this.props.id) {
            return <input
                onClick={ this.appendNewChild.bind(this) }
                type="submit" value="Add"
            />
        }
    }

    handleChange(field, event) {
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
                hashId:     this.props.hashId,
                field:  field,
                value:  value
            })
        );
    }

    appendNewChild() {
        this.props.dispatch( appendNewChildExp({ hashId: this.props.hashId }) );
    }

    showChildren() {
        const exps = this.props.children;

        if (exps && exps.length > 0) {
            return exps.map(exp =>
                <Exp
                    key={exp.hashId}
                    dispatch={this.props.dispatch}
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