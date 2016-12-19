import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';

class ChangePasswordPTR extends Component {

    componentDidMount() {

        this.PersonalForm = $('.corporation-form');
        this.PersonalForm.validate({
            rules: {
                first_name: {
                    required: true,
                },
                last_name: {
                    required: true,
                },

            },
            messages: {
                first_name: {
                    required: 'لطفا نام خود را وارد نمایید',
                },
                last_name: {
                    required: 'لطفا نام خانوادگی را وارد نمایید',
                },

            }
        });
    }


    render() {
        const {handleSubmit, SubmitCorporation} = this.props;
        return(
            <form action="#">
                <div className="form-group">
                    <label className="control-label">Current Password</label>
                    <Field type="password" component="input" name="old-password" className="form-control" /> </div>
                <div className="form-group">
                    <label className="control-label">New Password</label>
                    <Field type="password" component="input" name="new-password" className="form-control" /> </div>
                <div className="form-group">
                    <label className="control-label">Re-type New Password</label>
                    <Field type="password" component="input" name="new-replay-password" className="form-control" /> </div>
                <div className="margin-top-10">
                    <a href="javascript:;" className="btn green"> Change Password </a>
                    <a href="javascript:;" className="btn default"> Cancel </a>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ChangePasswordForm'
})(ChangePasswordPTR);