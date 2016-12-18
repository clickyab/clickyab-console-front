import React, {Component} from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import UserProfilePTR from './UserProfilePTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {successfulLogin, failedLogin} from '../../redux/actions/login';
import {AlertBox} from "../../functions/notifications";
import {GetGravatar} from "../../functions/gravatar";
let Ladda = require('ladda/js/ladda');
let store = require('store');

@connect()
class UserProfileCTR extends Component {


    render() {
        return (<UserProfilePTR/>);
    }
}

export default UserProfileCTR;