import {loading} from "../../functions/loading";
import React from "react";
import warning from "react-router/lib/routerWarning";
import invariant from "invariant";
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

function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}

var _React$PropTypes = React.PropTypes;
var bool = _React$PropTypes.bool;
var object = _React$PropTypes.object;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;
var oneOfType = _React$PropTypes.oneOfType;


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

function createLocationDescriptor(to, _ref) {
    var query = _ref.query;
    var hash = _ref.hash;
    var state = _ref.state;

    if (query || hash || state) {
        return {pathname: to, query: query, hash: hash, state: state};
    }

    return to;
}


var Link = React.createClass({
    displayName: 'Link',


    contextTypes: {
        router: routerShape
    },

    propTypes: {
        to: oneOfType([string, object]),
        query: object,
        hash: string,
        state: object,
        activeStyle: object,
        activeClassName: string,
        onlyActiveOnIndex: bool.isRequired,
        onClick: func,
        onCustomClick: func,
        target: string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            onlyActiveOnIndex: false,
            style: {}
        };
    },
    handleClick: function handleClick(event) {
        if ($(event.target).parents('li').hasClass("active")) {
            event.preventDefault();
            return false;
        }
        loading(true);
        if (this.props.onCustomClick) this.props.onCustomClick(event);

        if (event.defaultPrevented) return;

        !this.context.router ? process.env.NODE_ENV !== 'production' ? invariant(false, '<Link>s rendered outside of a router context cannot navigate.') : invariant(false) : void 0;

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

        // If target prop is set (e.g. to "_blank"), let browser handle link.
        /* istanbul ignore if: untestable with Karma */
        if (this.props.target) return;

        event.preventDefault();

        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
        var hash = _props.hash;
        var state = _props.state;

        var location = createLocationDescriptor(to, {query: query, hash: hash, state: state});

        this.context.router.push(location);
    },
    render: function render() {
        var _props2 = this.props;
        var to = _props2.to;
        var query = _props2.query;
        var hash = _props2.hash;
        var state = _props2.state;
        var activeClassName = _props2.activeClassName;
        var activeStyle = _props2.activeStyle;
        var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

        var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

        process.env.NODE_ENV !== 'production' ? warning(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;

        // Ignore if rendered outside the context of router, simplifies unit testing.
        var router = this.context.router;

        let LiClassName = 'nav-item';
        if (router) {
            // If user does not specify a `to` prop, return an empty anchor tag.
            if (to == null) {
                return React.createElement('a', props);
            }

            var location = createLocationDescriptor(to, {query: query, hash: hash, state: state});

            props.href = router.createHref(location);
            if (location == window.location.pathname) {

                LiClassName += ' active';
                if (activeStyle) props.style = _extends({}, props.style, activeStyle);
            }
        }
        let {dropdown} = props;
        let customProps = Object.assign({}, props);
        delete customProps.dropdown;
        delete customProps.onCustomClick;

        return (
            <li className={LiClassName}>
                {React.createElement('a', _extends({}, customProps, {onClick: this.handleClick}))}
                {dropdown ? dropdown: <span/>}
            </li>
        );
    }
});


export default (props) => <Link {...props} onCustomClick={(event) => {
    let li = $(event.target).parents('li');
    li.siblings().removeClass('active');
    li.addClass('active');
}}/>;