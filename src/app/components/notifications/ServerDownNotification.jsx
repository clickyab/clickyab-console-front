import React, {Component} from "react";

export default class ServerDownNotification extends Component {
    onClick(event) {
        let {onAnEventSeenClick, notification: {id}} = this.props;

        onAnEventSeenClick(id)
    }

    render() {
        let {count, notification: {message}} = this.props;

        return (
            <div>
                <span className="fa fa-bullhorn"/>
                <span className="title">{message}  {count}</span>
                <button className="btn btn-primary" onClick={this.onClick.bind(this)}>seen</button>
            </div>
        );
    }
}