import {loading} from "../../functions/loading";
import React from "react";
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

class Link extends React.Component {
    LiClassName;

    state = {
        open: ''
    };


    setParent() {
        this.setState({
            open: 'open'
        });
    }

    componentDidMount() {
        if (this.props.setParent) {
            this.props.setParent();
        }
    }

    handleClick(event) {
        if ($(event.target).parents('li').hasClass("active")) {
            event.preventDefault();
            return false;
        }
        loading(true);
        if (this.props.onCustomClick) this.props.onCustomClick(event);

        if (event.defaultPrevented) return;

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
    }


    render() {
        let _props2 = this.props;
        let to = _props2.to;
        let query = _props2.query;
        let hash = _props2.hash;
        let state = _props2.state;
        let activeClassName = _props2.activeClassName;
        let activeStyle = _props2.activeStyle;
        let onlyActiveOnIndex = _props2.onlyActiveOnIndex;

        let props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state',
            'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

        let router = this.context.router;

        this.LiClassName = 'nav-item';

        if (router) {
            if (to == null) {
                return React.createElement('a', props);
            }

            let location = createLocationDescriptor(to, {query: query, hash: hash, state: state});

            props.href = router.createHref(location);
            if (location == window.location.pathname) {

                this.LiClassName += ' active';

                if (activeStyle) props.style = _extends({}, props.style, activeStyle);
            }
        }
        let {Dropdown} = props;

        let customProps = Object.assign({}, props);
        delete customProps.Dropdown;
        delete customProps.onCustomClick;
        delete customProps.setParent;
        let self = this;

        return (
            <li className={this.LiClassName + " " + this.state.open}>
                {React.createElement('a', _extends({}, customProps, {
                    onClick: self.handleClick.bind(this)
                }))}
            </li>
        );
    }
}

Link.contextTypes = {
    router: routerShape
};

export default (props) => <Link {...props} onCustomClick={(event) => {
    let li = $(event.target).parents('li');
    li.siblings().removeClass('active');
    li.addClass('active');

    if ($(event.target).parents('li').parents('ul.sub-menu').length == 0) {
        let li = $(event.target).parents('li').parents('ul').parent('li');
        li.siblings().removeClass('active');
        li.addClass('active');
    }
}}/>;