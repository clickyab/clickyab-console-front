import React, {Component, PropTypes} from "react";
import NumericSelect from "./../common/form/NumericSelect";
import {getCity} from "../../redux/helpers";
import {dispatch} from "../../functions/dispatch";
import {change} from "redux-form/lib/index";

export default class SelectLocationPTR extends Component {
	componentDidMount() {
		dispatch(change("PersonalUserForm", 'country_id', 1));
	}

	render() {
		let {onCountryChanged, onProvinceChanged, countries, provinces, cities, form} = this.props;

		return (
			<div className="row">
				<div className="col-md-4">
					<div className="form-group">
						<label>انتخاب کشور</label>
						<NumericSelect onCustomChange={onCountryChanged}
									   className="form-control select-country"
									   data-placeholder="انتخاب کشور"
									   name="country_id" form={form}>
							<option value={0}> کشور استان</option>
							{countries.map(country =>
								<option key={country.id} value={country.id}>{country.name}</option>
							)}

						</NumericSelect>
					</div>
				</div>

				<div className="col-md-4">
					<div className="form-group">
						<label>استان</label>
						<NumericSelect selected={2} onCustomChange={onProvinceChanged}
									   className="form-control select-province"
									   data-placeholder="انتخاب استان"
									   name="province_id" form={form}>
							<option value={0}>انتخاب استان</option>
							{provinces.map(province =>
								<option key={province.id} value={province.id}>{province.name}</option>
							)}
						</NumericSelect>
					</div>
				</div>
				<div className="col-md-4">
					<div className="form-group">
						<label>شهر</label>
						<NumericSelect selected={getCity()} className="form-control select-city"
									   data-placeholder="انتخاب شهر"
									   tabIndex="1" name="city_id" form={form}>
							<option value={0}>انتخاب شهر</option>
							{cities.map(city =>
								<option key={city.id} value={city.id}>{city.name}</option>
							)}
						</NumericSelect>
					</div>
				</div>
			</div>
		)
	}
}

SelectLocationPTR.propTypes = {
    onCountryChanged: PropTypes.func,
    onProvinceChanged: PropTypes.func,
    countries: PropTypes.array,
    provinces: PropTypes.array,
    cities: PropTypes.array,
    form: PropTypes.object,
};