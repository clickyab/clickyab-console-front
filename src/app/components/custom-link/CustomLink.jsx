import React, { Component } from 'react';
import { Link } from 'react-router'

export default class NavLink extends Component {
    render() {
        let isActive = this.context.router.isActive(this.props.to, true);
        let className = isActive ? "nav-item start active" : "";

        return (
            <li className={className}>
                <Link {...this.props} className="nav-link nav-toggle"/>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object
};
