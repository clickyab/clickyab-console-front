import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';

export default class LoginCTR extends Component {
    login() {
        (new swagger.UserApi())
            .userLoginPost({
                'payloadData': {
                    "email": "string",
                    "password": "string"
                }
            }, function (response) {
                console.log(response)
            });
    }

    componentDidMount() {
        this.login();
    }

    render() {
        return (<LoginPTR login={this.login.bind(this)}/>);
    }
}