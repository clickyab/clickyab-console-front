import React, {Component, PropTypes} from "react";
import {Trash} from "./NotificationsDropDown";

export default class WarningNotification extends Component {
    state = {
        trash: <span/>
    };

    constructor(props) {
        super(props);

        this.hideTrash = this.hideTrash.bind(this);
        this.onClick = this.onClick.bind(this);
        this.showTrash = this.showTrash.bind(this);
    }

    onClick() {
        let {onAnEventSeenClick, notification: {id}} = this.props;

        onAnEventSeenClick(id);
    }

    showTrash() {
        this.setState({trash: <Trash/>});
    }

    hideTrash() {
        this.setState({trash: <span/>});
    }

    render() {
        let {count, notification: {message}} = this.props;
        let {trash} = this.state;

        return (
            <div className="menu-list-custom-block" onMouseLeave={this.hideTrash}
                 onMouseEnter={this.showTrash}>
                <span className="label label-sm label-icon label-warning"><i className="fa fa-bell-o"/></span>
                <span className="title">{count} - {message}  </span>
                <span className="time" onClick={this.onClick}>
                    {trash}
                </span>
            </div>
        );
    }
}

WarningNotification.propTypes = {
    count: PropTypes.number,
    notification: PropTypes.object,
    onAnEventSeenClick: PropTypes.func
};