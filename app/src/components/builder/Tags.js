import React from "react";

import Skills from "./tags/Skills";
import References from "./tags/References";

export default class Tags extends React.Component {
    render() {
        return (
            <div>
                <h2>Tags</h2>
                <Skills/>
            </div>
        );
    }
}