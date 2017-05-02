import React, {Component, PropTypes} from "react";
import {change, Field} from "redux-form";
import {dispatch} from "../../../functions/dispatch";

class NumericSelect extends Component {
	render() {
		const {name, children, onCustomChange, className, form} = this.props;
		return (
			<select key={Math.random()} {...this.props.input} onBlur={() => {
			}}
					className={className} name={name} id={name} onChange={(event) => {
				if (typeof onCustomChange !== 'undefined') {
					onCustomChange(event);
				}

				dispatch(change(form, name, parseInt(event.target.value)));
			}}>
				{children}
			</select>
		)
	}
}

NumericSelect.propTypes = {
	children: PropTypes.array,
    className: PropTypes.string,
    input: PropTypes.object,
	form: PropTypes.string,
	name: PropTypes.string,
    onCustomChange: PropTypes.func
};

let Select =  (props) => <Field component={NumericSelect} {...props}/>;
export default Select;
