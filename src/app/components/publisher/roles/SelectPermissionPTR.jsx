import React, {Component} from "react";
import {Field} from "redux-form";
import Select from "react-select";

export default class SelectPermissionPTR extends Component {
	onEachRender({options, selfValue, parentValue, globalValue}) {
		let array = [];
		array.push.apply(array, selfValue);
		array.push.apply(array, parentValue);
		array.push.apply(array, globalValue);

		return options.filter(val => !array.includes(val));
	}

	render() {
		let {
			multi, selfValue, parentValue, globalValue, selfCheckbox, parentCheckbox, globalCheckbox, toggleDisabled,
			handleOnChangeSelf, handleOnChangeParent, handleOnChangeGlobal
		} = this.props;
		let options = this.onEachRender(this.props);

		return (
			<div>
				<div className="form-group">
					<label className="mt-checkbox">
						<Field component="input" id="selfCheckbox" value="self"
							   onClick={toggleDisabled}
							   name="self"
							   type="checkbox"/> خودم
						<span/>
					</label>
					<Select
						disabled={!selfCheckbox}
						multi={multi}
						options={options}
						onChange={handleOnChangeSelf}
						value={selfValue}
						placeholder='انتخاب دسترسی...'
					/>
				</div>
				<div className="form-group">
					<label className="mt-checkbox">
						<Field component="input" id="parentCheckbox" value="parent"
							   onClick={toggleDisabled}
							   name="parent"
							   type="checkbox"/> PARENT
						<span/>
					</label>
					<Select
						disabled={!parentCheckbox}
						multi={multi}
						options={options}
						onChange={handleOnChangeParent}
						value={parentValue}
						placeholder='انتخاب دسترسی...'
					/>
				</div>
				<div className="form-group">
					<label className="mt-checkbox">
						<Field component="input" id="globalCheckbox" value="global"
							   onClick={toggleDisabled}
							   name="global"
							   type="checkbox"/> Global
						<span/>
					</label>
					<Select
						disabled={!globalCheckbox}
						multi={multi}
						options={options}
						onChange={handleOnChangeGlobal}
						value={globalValue}
						placeholder='انتخاب دسترسی...'
					/>
				</div>
			</div>
		)
	}
}