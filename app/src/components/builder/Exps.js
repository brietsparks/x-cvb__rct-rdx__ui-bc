import React from "react";

import { connect } from "react-redux"

import Exp from "./exps/Exp";

import {
    fetchExps,
    appendNewChildExp
} from "actions/expActions";

@connect((store) => {
    return {
        exps: store.exps.exps,
        user: store.auth.user,
        skills: store.skills.skills
    };
})
export default class Exps extends React.Component {
    componentWillMount() {
        this.fetchExps();
    }

    render() {
        const expElems = this.showExps();

        return (
            <div>
                <h2>Exps</h2>

                {this.showAddExp()}

                <div>
                    {expElems}
                </div>
            </div>
        );
    }

    fetchExps() {
        this.props.dispatch(fetchExps())
    }

    showExps() {
        const exps = this.props.exps;

        if(exps && exps.length > 0) {
            return exps.map(exp =>
                <Exp
                    key={exp.hashId}
                    {...exp}
                    userSkills={this.props.skills}
                />
            );
        }
    }

    showAddExp() {
        return <input
            onClick={ this.addExp.bind(this) }
            type="submit" value="Add"
        />
    }

    addExp() {
        this.props.dispatch( appendNewChildExp({}) );
    }
}
