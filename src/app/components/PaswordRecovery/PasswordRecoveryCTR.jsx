import React, {Component} from 'react';
import PasswordRecoveryPTR from './PasswordRecoveryPTR';
import swagger from './../../swagger/src/index';

export default class PasswordRecoveryCTR extends Component {

    SubmitCall = (values, form) => {
        if (form.valid()) {

            (new swagger.UserApi())
                .userForgotCallPost({
                        'payloadData': {
                            "email": "string",
                        }
                    },
                    function (response) {
                        console.log(response)
                    });
        } else {
            console.log("***");
        }
    };

    render() {
        return (<PasswordRecoveryPTR SubmitCall={this.SubmitCall}/>);
    }
}