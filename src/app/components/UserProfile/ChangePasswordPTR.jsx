import React, {Component} from 'react';
import $ from 'jquery';
import {Field, reduxForm} from 'redux-form';

class ChangePasswordPTR extends Component {
    changePasswordForm;
    state = {
        validation: true
    };
    componentDidMount() {

        this.changePasswordForm = $(".change-password-form");
        this.changePasswordForm.validate({
            rules: {
                old_password: {
                    required: true,
                    minlength: 6,
                },
                new_password: {
                    required: true,
                    minlength: 6,
                },
                new_replay_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#new_password",
                },

            },
            messages: {
                old_password: {
                    required: 'لطفا کلمه عبور فعلی خود را وارد نمایید',
                    minlength: 'کلمه عبور حداقل باید ۵ کاراکتر باشد',
                },
                new_password: {
                    required: 'لطفا کلمه عبور جدید را وارد نمایید',
                    minlength: 'کلمه عبور حداقل باید ۵ کاراکتر باشد',
                },
                new_replay_password: {
                    required: 'لطفا کلمه عبور جدید را تکرار نمایید',
                    minlength: 'کلمه عبور حداقل باید ۵ کاراکتر باشد',
                    equalTo: 'کلمه عبور و تکرار آن باید یکسان باشد',
                },

            }
        });
    }


    render() {
        const {handleSubmit, SubmitChangePasswordUser} = this.props;
        return(
            <form className="change-password-form" role="form" action="" method="POST" onSubmit={handleSubmit((values) => SubmitChangePasswordUser(values, this.changePasswordForm))}>
                <div className="form-group">
                    <label className="control-label" htmlFor="old_password">Current Password</label>
                    <Field type="password" component="input" name="old_password" id="old_password" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="new_password">New Password</label>
                    <Field type="password" component="input" name="new_password" id="new_password" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="new_replay_password">Re-type New Password</label>
                    <Field type="password" component="input" name="new_replay_password" id="new_replay_password" className="form-control" />
                </div>
                <div className="margin-top-10">
                    <button type="submit" className="btn green"> Change Password </button>
                    <a href="javascript:;" className="btn default"> Cancel </a>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'ChangePasswordForm'
})(ChangePasswordPTR);