import React, {Component} from "react";
import {Field, change} from "redux-form";
import {dispatch} from "../../../functions/dispatch";

class NumericSelect extends Component {
	render() {
		const {value, name, children, className, form} = this.props;
		return (
			<select className={className} name={name} id={name} value={value} onChange={(event) => {
				dispatch(change(form, name, parseInt(event.target.value)));
			}}>
				{children}
			</select>
		)
	}
}

export default (props) => <Field component={NumericSelect} {...props}/>
