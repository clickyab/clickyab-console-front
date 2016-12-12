import React, {Component} from 'react';
import PasswordRecoveryPTR from './PasswordRecoveryPTR';
import swagger from './../../swagger/index';

export default class PasswordRecoveryCTR extends Component {

    SubmitCall = (values, form) => {
        if (form.valid()) {
            (new swagger.UserApi())
                .userLoginPost({
                        'payloadData': {
                            "email": "string",
                            "password": "string"
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