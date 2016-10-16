import React from "react";

import Header from "./Header";
import Tags from "./builder/Tags";

export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <Tags />
            </div>
        )
    }
}