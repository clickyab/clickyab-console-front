import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';

export default class LoginCTR extends Component {

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
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}