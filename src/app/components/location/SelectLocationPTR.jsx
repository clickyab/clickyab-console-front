import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {select} from "../../functions/select";

class SelectLocationPTR extends Component {

    // handleInitialize() {
    //     const initData = select("user.personal", {}, true);
    //     initData.email = getEmail();
    //     this.props.initialize(initData);
    // }
    //
    // componentDidMount() {
    //     this.handleInitialize();
    // }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>انتخاب کشور</label>
                        <select className="form-control select-country" id="country_id" data-placeholder="انتخاب کشور" tabIndex="1"
                                name="country_id">
                            <option>انتخاب کشور</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label>استان</label>
                        <select className="form-control select-province" data-placeholder="انتخاب استان" tabIndex="1"
                                name="province_id">
                            <option>انتخاب استان</option>

                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>شهر</label>
                        <select className="form-control select-city" data-placeholder="انتخاب شهر" tabIndex="1"
                                name="city_id">
                            <option>انتخاب شهر</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({
    form: 'SelectLocationPTR'
})(SelectLocationPTR);