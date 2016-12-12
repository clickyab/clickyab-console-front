import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';

export default class LoginCTR extends Component {
    SubmitCall = (form) => {
        return (values) => {
            console.log("asd");
            if (form.valid()) {
                console.log("mili");
                (new swagger.UserApi())
                    .userLoginPost({
                        'payloadData': {
                            "email": "string",
                            "password": "string"
                        }
                    }, function (response) {
                        console.log(response)
                    });
            } else {
                console.log("fuck");
            }
        }
    }
    render() {
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}