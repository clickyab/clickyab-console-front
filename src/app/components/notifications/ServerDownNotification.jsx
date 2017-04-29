import React, {Component, PropTypes} from "react";

export default class ServerDownNotification extends Component {
    onClick() {
        let {onAnEventSeenClick, notification: {id}} = this.props;

        onAnEventSeenClick(id)
    }

    render() {
        let {count, notification: {message}} = this.props;

        return (
            <div>
                <span className="label label-sm label-icon label-danger"><i className="fa fa-bolt"/></span>
                <span className="title">{count} - {message}  </span>
                <span className="time" onClick={this.onClick.bind(this)}/>
            </div>
        );
    }
}

ServerDownNotification.propTypes = {
    onAnEventSeenClick: PropTypes.func,
    notification: PropTypes.object,
    count: PropTypes.number,
};