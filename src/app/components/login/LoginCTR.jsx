import React, {Component} from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {successfulLogin, failedLogin} from '../../redux/actions/login';
import {AlertBox} from "../../functions/notifications";
let Ladda = require('ladda/js/ladda');
let store = require('store');

@connect()
class LoginCTR extends Component {
    SubmitCall = (values, form) => {
        let {dispatch} = this.props;
        if (form.valid()) {
            let loadingProgress = Ladda.create(document.querySelector('.login-form button'));
            loadingProgress.start();
            (new swagger.UserApi())
                .userLoginPost({
                        'payloadData': {
                            "email": values.email,
                            "password": values.password
                        }
                    },
                    function (error, data, response) {
                        if (response.statusCode == '200') {
                            dispatch(successfulLogin(data.email, data.token, data.user_id));
                            store.set(data.user_id, { email: data.email, token: data.token });
                            browserHistory.push('/publisher');
                            AlertBox("success",response.text);
                        }
                        else if (response.statusCode == '400') {
                            loadingProgress.stop();
                            dispatch(failedLogin());
                            AlertBox("error",response.text);
                        }
                    });
        } else {
            console.log("***");
        }
    };
    render() {
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}

export default LoginCTR;