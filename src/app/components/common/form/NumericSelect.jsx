import React, {Component} from "react";
import {change, Field} from "redux-form";
import {dispatch} from "../../../functions/dispatch";

class NumericSelect extends Component {
	render() {
		const {name, children, onCustomChange, className, form} = this.props;
		return (
			<select key={Math.random()} {...this.props.input} onBlur={() => {
			}}
					className={className} name={name} id={name} onChange={(event) => {
				if (typeof onCustomChange != 'undefined') {
					onCustomChange(event);
				}

				dispatch(change(form, name, parseInt(event.target.value)));
			}}>
				{children}
			</select>
		)
	}
}

export default (props) => <Field component={NumericSelect} {...props}/>
