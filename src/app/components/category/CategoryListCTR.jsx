import React, {Component} from "react";
import {connect} from "react-redux";
import CategoryListPTR from './CategoryListPTR';

@connect()
class CategoryListCTR extends Component {
	render() {
		return (<CategoryListPTR SubmitCall={this.SubmitCall}/>);
	}
}

export default CategoryListCTR;