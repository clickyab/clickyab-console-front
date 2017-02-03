import React, {Component} from "react";
import SelectPlanPTR from "./SelectPlanPTR";
import {connect} from "react-redux";
import {store} from "./../../../../redux/store";


@connect()
export default class SelectPlanCTR extends Component {
	render() {
		let planData = store.getState().planList;
		return (
			<SelectPlanPTR PlanList={planData}/>
		);
	}
}
