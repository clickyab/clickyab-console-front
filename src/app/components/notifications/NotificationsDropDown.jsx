import React, {Component} from "react";
import {dispatch} from "../../functions/dispatch";
import Count from "./Count";
import DropDown from "./DropDown";
import {
    markAllNotificationAsShown,
    updateLocalStorageAction
} from "../../redux/actions/index";
let $ = require('jquery');

export default class Notifications extends Component {
    open = false;

    bindToNotifications() {
        $('.notification-dropdown').on('shown.bs.dropdown', function () {
            dispatch(markAllNotificationAsShown());
            dispatch(updateLocalStorageAction())
        });
    }

    componentDidMount() {
        this.bindToNotifications();
    }

    componentWillUnmount() {
        $('.notification-dropdown').unbind();
    }

    render() {
        return (
            <li className="dropdown dropdown-extended dropdown-notification notification-dropdown"
                id="header_notification_bar">
                <div className="dropdown-toggle notifications-division" data-toggle="dropdown" data-hover="dropdown"
                     data-close-others="true" aria-expanded="false" style={{paddingRight: '7px'}}>
                    <i className="icon-bell"/>
                    <Count/>
                </div>
                <DropDown/>
            </li>
        );
    }
}