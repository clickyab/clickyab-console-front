import React, {Component} from "react";
import UserProfilePTR from "./UserProfilePTR";
let $ = require("jquery");

export default class UserProfileCTR extends Component {
	componentDidMount() {
		$('.preloader-page').hide();
	}

	render() {
		return (<UserProfilePTR />);
	}
}
