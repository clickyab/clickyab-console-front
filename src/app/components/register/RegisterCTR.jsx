import React, {Component} from 'react';
import RegisterPTR from './RegisterPTR';
import swagger from './../../swagger/index';

export default class RegisterCTR extends Component {

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
        return (<RegisterPTR SubmitCall={this.SubmitCall}/>);
    }
}