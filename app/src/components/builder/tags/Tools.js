import React from "react";

import Tag from "./Tag";
import * as ToolActions from "../../../actions/ToolActions";
import ToolsStore from "../../../stores/ToolsStore";

export default class Tools extends React.Component {
    constructor() {
        super();
        this.state = {
            tools: ToolsStore.getAll()
        }
    }

    componentWillMount() {
        ToolsStore.on("change", () => {
            this.setState({
                tools: ToolsStore.getAll()
            })
        })
    }

    createTool() {
        ToolActions.createTool(Date.now())
    }

    render() {
        const { tools } = this.state;
        const toolComponents = tools.map((tool) => <Tag key={tool.id} title={tool.title} />);
        return (
            <div>
                <h3>Tools</h3>
                <input />
                <button onClick={this.createTool.bind(this)}>Add</button>
                {toolComponents}
            </div>
        );
    }
}