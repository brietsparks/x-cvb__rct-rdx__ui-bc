import React from "react";

import Auth from "./header/Auth";
import Loading from "./header/Loading";

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <Loading/>
                <Auth/>
            </div>
        );
    }
}