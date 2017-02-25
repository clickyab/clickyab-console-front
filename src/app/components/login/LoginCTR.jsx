import React, {Component} from "react";
import LoginPTR from "./LoginPTR";
import swagger from "./../../swagger/index";
import {connect} from "react-redux";
import {successfulLogin, failedLogin} from "../../redux/actions/login";
import {SuccessBoxAlert, FailedBoxAlert} from "../../functions/notifications";
import {updateLocalStorageAction} from "../../redux/actions/index";
import {updateUserInformation} from "../../redux/actions/user";
import {navigate} from "../../functions/navigate";
let Ladda = require('ladda/js/ladda');

@connect()
export default class LoginCTR extends Component {
    loadingProgress;

    componentDidMount() {
        $('.preloader-page').hide();
    }

    loginSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(successfulLogin());
        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorageAction());
        navigate('/v1/advertiser');
    }

    failed400Dispatcher() {
        this.props.dispatch(failedLogin());
    }

    loginCallback({error, data, response}) {
        response.error = 'اطلاعات کاربری شما صحیح نمی‌باشد.';
        response.text = 'شما با موفقیت وارد شدید.';

        if (response.statusCode == '200') {
            this.loginSuccessfullyDispatchers(Object.assign({}, data));

            SuccessBoxAlert(response);
        } else if (response.statusCode == '400') {
            this.failed400Dispatcher();

            this.stopLoading();
            FailedBoxAlert(response);
        }
    }

    login(formValues) {
        (new swagger.UserApi())
            .userLoginPost({'payloadData': formValues})
            .then(response => this.loginCallback(response));
    }

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('.login-form button'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    SubmitCall = (formValues, form) => {
        if (!form.valid())
            return;

        this.loading();
        this.login(formValues)
    };

    render() {
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}
