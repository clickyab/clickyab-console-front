import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

@connect(({notifications}) => ({notifications}))
export default class Count extends Component {
    count(notifications) {
        let count = 0;
        notifications.map(notification => {
            if (!notification.shown)
                count += 1;
        });

        return count;
    }

    render() {
        const count = this.count(this.props.notifications);

        return (
            count != 0 ?
                <span className="badge badge-default">
                    <span>{this.count(this.props.notifications)}</span>
                </span> :
                <span/>
        )

    }
}

Count.propTypes = {
    notifications: PropTypes.object
};