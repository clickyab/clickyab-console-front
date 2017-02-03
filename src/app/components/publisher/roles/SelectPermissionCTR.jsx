import React, {Component} from "react";
import SelectPermissionPTR from "./SelectPermissionPTR";

export default class SelectPermissionCTR extends Component {


	toggleDisabled(e) {
		this.props.setSelectPermission(e.target.id, !e.target.checked);
	}

	handleOnChangeSelf(value) {
		this.props.setSelectPermission('selfValue', value)
	}

	handleOnChangeParent(value) {
		this.props.setSelectPermission('parentValue', value)
	}

	handleOnChangeGlobal(value) {
		this.props.setSelectPermission('globalValue', value)
	}

	initialOptions() {
		let option = [];
		for (let permission in this.props.permissions) {
			option.push({value: this.props.permissions[permission], label: this.props.permissions[permission]});
		}
		this.props.setSelectPermission('options', option)
	}


	componentDidMount() {
		this.initialOptions()
	}

	render() {
		return (<SelectPermissionPTR toggleDisabled={this.toggleDisabled.bind(this)}
									 handleOnChangeSelf={this.handleOnChangeSelf.bind(this)}
									 handleOnChangeParent={this.handleOnChangeParent.bind(this)}
									 handleOnChangeGlobal={this.handleOnChangeGlobal.bind(this)}
									 {...this.props.selectPermission}
		/>)
	}
}