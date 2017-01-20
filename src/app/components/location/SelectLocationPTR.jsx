import React, {Component} from "react";
import {Field} from "redux-form";
import NumericSelect from "./../common/form/NumericSelect";
import {connect} from 'react-redux';

@connect(({user}) => ({user}))
export default class SelectLocationPTR extends Component {

	componentDidMount() {
		let {user, callProvinceName, callCityName} = this.props;
		callProvinceName(user.personal.province_id);
		callCityName(user.personal.city_id);
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-4">
					<div className="form-group">
						<label>انتخاب کشور</label>
						<NumericSelect className="form-control select-country" data-placeholder="انتخاب کشور"
									   tabIndex="1" name="country_id" form="PersonalUserForm">
							<option>انتخاب کشور</option>
						</NumericSelect>
					</div>
				</div>

				<div className="col-md-4">
					<div className="form-group">
						<label>استان</label>
						<NumericSelect className="form-control select-province" data-placeholder="انتخاب استان"
									   tabIndex="1" name="province_id" form="PersonalUserForm">
							<option>انتخاب استان</option>
						</NumericSelect>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label>شهر</label>
						<NumericSelect className="form-control select-city" data-placeholder="انتخاب شهر"
									   tabIndex="1" name="city_id" form="PersonalUserForm">
							<option>انتخاب شهر</option>
						</NumericSelect>
					</div>
				</div>
			</div>
		)
	}

}

