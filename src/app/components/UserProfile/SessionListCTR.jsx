import React, {Component} from 'react';
import SessionListPTR from './SessionListPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {SuccessBoxAlert , FailedBoxAlert} from "../../functions/notifications";
import {push} from "react-router-redux";
import {getToken} from "../../redux/helpers";
let Ladda = require('ladda/js/ladda');

@connect()
export default class SessionListCTR extends Component {

    render() {
        return (<SessionListPTR/>);
    }
}
