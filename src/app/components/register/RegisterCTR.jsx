import React, {Component} from 'react';
import $ from 'jquery';
import RegisterPTR from './RegisterPTR';
import swagger from './../../swagger/index';
import {AlertBox} from '../../functions/notifications';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {successfulRegister, failedRegister} from '../../redux/actions/register';
let Ladda = require('ladda/js/ladda');
let store = require('store');

@connect()
export default class RegisterCTR extends Component {

    SubmitCall = (values, form) => {
        let {dispatch} = this.props;
        if (form.valid()) {
            let loadingProgress = Ladda.create(document.querySelector('.register-form button'));
            loadingProgress.start();
            ( new swagger.UserApi())
                .userRegisterPost({
                        'payloadData': {
                            "email": values.email,
                            "password": values.password
                        },
                    },
                    function (error, data, response) {
                        console.log(response);
                        console.log(error, data, response);
                        if (response.statusCode == '200') {
                            store.set(data.user_id, { email: data.email, token: data.token });
                            dispatch(successfulRegister(data.email, data.token, data.user_id));
                            browserHistory.push('/publisher');
                            AlertBox("success",response.text);
                        }
                        else if (response.statusCode == '400') {
                            loadingProgress.stop();
                            dispatch(failedRegister());
                            AlertBox("error",response.text);
                        }
                    });
        } else {
            console.log("***");
        }
    };
    render() {
        return (<RegisterPTR SubmitCall={this.SubmitCall}/>);
    }
}