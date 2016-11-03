import React from "react";
import ExpForm from "./ExpForm";

import { connect } from "react-redux"

@connect((store) => {
    return { };
})
export default class Exp extends React.Component {
    render() {
        const props = this.props;
        const children = this.showChildren();

        console.log('2:');
        console.log(children);

        return (
            <div class="exp">
                <ExpForm onSubmit={this.handleSubmit} />
                <input
                    onClick={ this.addSkill.bind(this) }
                    type="submit" value="Add"
                />
                <div class="exp-children">
                    {children}
                </div>

                <hr/>
            </div>
        );
    }

    addSkill() {

    }

    handleSubmit() {

    }

    showChildren() {
        const exps = this.props.children;

        if (exps && exps.length > 0) {
            return exps.map(exp =>
                <Exp
                    key={exp.id}
                    {...exp}
                />
            );
        }
    }
}