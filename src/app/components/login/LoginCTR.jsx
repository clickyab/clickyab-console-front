import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';

export default class LoginCTR extends Component {

    SubmitCall = (values, form) => {
        console.log('ads', form);
        if (form.valid()) {
            console.log("mili");
            (new swagger.UserApi())
                .userLoginPost({'payloadData': values},
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