import React, {Component} from 'react';
import UserProfilePTR from './UserProfilePTR';
// import swagger from './../../swagger/index';
import {connect} from 'react-redux';
// import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
// import {updateLocalStorageAction} from "../../redux/actions/index";
// import {updateUserInformation} from "../../redux/actions/user";
// import {push} from "react-router-redux";
// import {getToken} from "../../redux/helpers";
// let Ladda = require('ladda/js/ladda');

@connect()
export default class UserProfileCTR extends Component {

    render() {
        return (<UserProfilePTR />);
    }
}
