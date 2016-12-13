import React, {Component} from 'react';
import RegisterPTR from './RegisterPTR';
import swagger from './../../swagger/src/index';
import {AlertBox} from '../../functions/notifications';
import {checkStatus} from "../../functions/helpers";

export default class RegisterCTR extends Component {

    SubmitCall = (values, form) => {
        if (form.valid()) {
            // console.log(form.find("button[type=submit]"));
            (new swagger.UserApi())
                .userRegisterPost({
                        'payloadData': {
                            "email": values.email,
                            "password": values.password
                        },
                    },

                    function (error, data, response) {
                        console.log(response);
                        if(response.statusCode == 400 ){
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