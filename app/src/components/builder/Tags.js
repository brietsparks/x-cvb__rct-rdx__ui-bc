import React from "react";

import Tools from "./tags/Tools";
import References from "./tags/References";

export default class Tags extends React.Component {
    render() {
        return (
            <div>
                <h2>Tags</h2>
                <Tools/>
                <References/>
            </div>
        );
    }
}