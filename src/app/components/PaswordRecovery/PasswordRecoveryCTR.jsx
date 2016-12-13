import React, {Component} from 'react';
import PasswordRecoveryPTR from './PasswordRecoveryPTR';
import swagger from './../../swagger/src/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AlertBox} from "../../functions/notifications";
let Ladda = require('ladda/js/ladda');

export default class PasswordRecoveryCTR extends Component {

    SubmitCall = (values, form) => {
        if (form.valid()) {
            let loadingProgress = Ladda.create(document.querySelector('.recovery-password-form button'));
            loadingProgress.start();
            (new swagger.UserApi())
                .userForgotCallPost({
                        'payloadData': {
                            "email": values.email,
                        }
                    },
                    function (error, data, response) {
                        if (response.statusCode == '200') {
                            // browserHistory.push('/publisher');
                            AlertBox("success",response.text);
                        }
                        else if (response.statusCode == '400') {
                            loadingProgress.stop();
                            AlertBox("error",response.text);
                        }
                    });
        } else {
            console.log("***");
        }
    };

    render() {
        return (<PasswordRecoveryPTR SubmitCall={this.SubmitCall}/>);
    }
}