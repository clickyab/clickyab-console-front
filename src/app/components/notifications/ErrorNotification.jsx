import React, {Component} from "react";

export default class ErrorgNotification extends Component {
    onClick(event) {
        let {onAnEventSeenClick, notification: {id}} = this.props;

        onAnEventSeenClick(id);
    }

    render() {
        let {count, notification: {message}} = this.props;

        return (
            <div>
                <span className="label label-sm label-icon label-danger"><i className="fa fa-times"/></span>
                <span className="title">{count} - {message}  </span>
                <span className="time" onClick={this.onClick.bind(this)}/>
            </div>
        );
    }
}