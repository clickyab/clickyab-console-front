import React, {Component} from "react";
import {connect} from "react-redux";
import UsersListPTR from './UsersListPTR';

@connect()
export default class UsersListCTR extends Component {
	render() {
		return (<UsersListPTR SubmitCall={this.SubmitCall}/>);
	}
}