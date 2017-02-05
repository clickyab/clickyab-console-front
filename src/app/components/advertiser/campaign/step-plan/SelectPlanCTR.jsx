import React, {Component} from "react";
import SelectPlanPTR from "./SelectPlanPTR";
import {connect} from "react-redux";
import {store} from "./../../../../redux/store";


@connect(({planList}) => ({planList}))
export default class SelectPlanCTR extends Component {
	render() {
		let planData = this.props.planList;
		return (
			<SelectPlanPTR PlanList={planData}/>
		);
	}
}
