import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import {select} from "../../functions/select";

@connect(({user}) => ({user}))
export default class SelectLocationPTR extends Component {

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
        let {user} = this.props;
        console.log(user.personal);

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label>انتخاب کشور</label>
                        <Field component='select' className="form-control select-country" id="country_id" data-placeholder="انتخاب کشور" tabIndex="1"
                               name="country_id">
                            <option>انتخاب کشور</option>
                        </Field>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group">
                        <label>استان</label>
                        <Field component="select" className="form-control select-province" data-placeholder="انتخاب استان" tabIndex="1"
                               name="province_id">
                            <option>انتخاب استان</option>

                        </Field>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label>شهر</label>
                        <Field component="select" className="form-control select-city" data-placeholder="انتخاب شهر" tabIndex="1"
                               name="city_id">
                            <option>انتخاب شهر</option>
                        </Field>
                    </div>
                </div>
            </div>
        )
    }

}

