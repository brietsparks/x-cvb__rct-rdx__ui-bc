import React from "react";

import { connect } from "react-redux"

import Exp from "./exps/Exp";

import { fetchExps } from "actions/expActions";

@connect((store) => {
    return {
        exps: store.exps.exps,
        user: store.auth.user
    };
})
export default class Exps extends React.Component {
    componentWillMount() {
        this.fetchExps();
    }

    render() {
        const expElems = this.showExps();
        const addExpElem = this.showAddExp();

        return (
            <div>
                <h2>Exps</h2>
                {addExpElem}

                <div>
                    {expElems}
                </div>

                {addExpElem}
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
                    key={exp.id}
                    {...exp}
                />
            );
        }

    }

    showAddExp() {

    }
}
