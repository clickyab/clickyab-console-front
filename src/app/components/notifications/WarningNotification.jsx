import React, {Component} from "react";
import {Trash} from "./NotificationsDropDown";

export default class WarningNotification extends Component {
    state = {
        trash: <span/>
    };

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
            <div className="menu-list-custom-block" onMouseLeave={this.hideTrash.bind(this)}
                 onMouseEnter={this.showTrash.bind(this)}>
                <span className="label label-sm label-icon label-warning"><i className="fa fa-bell-o"/></span>
                <span className="title">{count} - {message}  </span>
                <span className="time" onClick={this.onClick.bind(this)}>
                    {trash}
                </span>
            </div>
        );
    }
}