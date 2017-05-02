import React, {Component, PropTypes} from "react";
import {routerShape} from "react-router";

var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };


function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
function isEmptyObject(object) {
    for (var p in object) {
        if (Object.prototype.hasOwnProperty.call(object, p)) return false;
    }
    return true;
}


function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}


function createLocationDescriptor(to, _ref) {
    let query = _ref.query;
    let hash = _ref.hash;
    let state = _ref.state;

    if (query || hash || state) {
        return {pathname: to, query: query, hash: hash, state: state};
    }

    return to;
}

export class SidebarLinks extends Component {
    unListen;

    constructor(props) {
        super(props);

        this.forceUpdateSidebarLinks = this.forceUpdateSidebarLinks.bind(this);
    }

    componentDidMount() {
        this.unListen = this.context.router.listen(() => {
            if (!this._calledComponentWillUnmount) {
                this.forceUpdate();
            }
        })
    }

    componentWillUnmount() {
        this.unListen();
    }

    getChildContext() {
        return {forceUpdateSidebarLinks: this.forceUpdateSidebarLinks};
    }

    forceUpdateSidebarLinks() {
        this.forceUpdate();
    }

    render() {
        let {children} = this.props;

        return (
            <ul className='page-sidebar-menu  page-header-fixed ' data-keep-expanded='false'
                data-auto-scroll='true' data-slide-speed='200' style={{paddingTop: 20 + 'px'}}>
                <li className='sidebar-toggler-wrapper hide'>
                    <div className='sidebar-toggler'>
                        <span/>
                    </div>
                </li>
                {children}
            </ul>
        );
    }
}
SidebarLinks.propTypes = {
    children: PropTypes.array
};
SidebarLinks.contextTypes = {
    router: routerShape
};
SidebarLinks.childContextTypes = {
    forceUpdateSidebarLinks: React.PropTypes.func
};

export class Link extends Component {
    static defaultProps = {
        onlyActiveOnIndex: false,
        style: {},
        activeClassName: 'active'
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if (this.props.onClick) this.props.onClick(event);

        if (event.defaultPrevented) return;

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

        if (this.props.target) return;

        event.preventDefault();

        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
        var hash = _props.hash;
        var state = _props.state;

        var location = createLocationDescriptor(to, {query: query, hash: hash, state: state});

        this.context.router.push(location);
        this.context.forceUpdateSidebarLinks();
    }

    render() {
        let _props2 = this.props;
        let to = _props2.to;
        let query = _props2.query;
        let hash = _props2.hash;
        let state = _props2.state;
        let activeClassName = _props2.activeClassName;
        let activeStyle = _props2.activeStyle;

        let props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

        let router = this.context.router;

        if (router) {
            // If user does not specify a `to` prop, return an empty anchor tag.
            if (to == null) {
                return React.createElement('a', props);
            }

            let location = createLocationDescriptor(to, {query: query, hash: hash, state: state});
            props.href = router.createHref(location);

            props.className = '';
            if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
                if (location == window.location.pathname) {
                    if (activeClassName) {
                        if (props.className) {
                            props.className += ' ' + activeClassName;
                        } else {
                            props.className = activeClassName;
                        }
                    }

                    if (activeStyle) props.style = _extends({}, props.style, activeStyle);
                }
            }
        }

        return (
            <li className={"nav-item " + props.className}>
                {React.createElement('a', _extends({}, props, {onClick: this.handleClick}))}
            </li>
        );
    }
}

Link.propTypes = {
    onClick: PropTypes.func,
    target: PropTypes.object
};

Link.contextTypes = {
    router: routerShape,
    forceUpdateSidebarLinks: React.PropTypes.func
};