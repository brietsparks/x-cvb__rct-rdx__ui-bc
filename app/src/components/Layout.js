import React from "react";
import { connect } from "react-redux"

import { fetchTools } from "../actions/toolsActions"

@connect((store) => {
    return {
        tools: store.tools.tools,
    };
})
export default class Layout extends React.Component {
    fetchTools() {
        this.props.dispatch(fetchTools())
    }
    render() {
        const { tools } = this.props;

        if (!tools.length) {
            return <button onClick={this.fetchTools.bind(this)}>load tools</button>
        }

        const mappedTools = tools.map(tool => <li>{tool.title}</li>)

        return <div>
            <ul>{mappedTools}</ul>
        </div>
    }
}