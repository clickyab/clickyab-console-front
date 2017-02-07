import React from "react";
import {RouteTransition} from "react-router-transition";


export default class App extends React.Component {
    render() {
        let children = this.props.children;
        return (
            <RouteTransition
                pathname={this.props.location.pathname}
                atEnter={{opacity: 0}}
                atLeave={{opacity: 0}}
                atActive={{opacity: 1}}
            >
                {children}
            </RouteTransition>


        )
    }
}