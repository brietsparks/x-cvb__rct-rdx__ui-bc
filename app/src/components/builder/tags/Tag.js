import React from "react";

export default class Tag extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
            </div>
        );
    }
}