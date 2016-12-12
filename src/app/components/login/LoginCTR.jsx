import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';

export default class LoginCTR extends Component {
    form;

    componentDidMount() {
        this.form = $("form");
    };

    SubmitCall = (from) => {
        return (values) => {
            console.log('ads', from);
            if (this.form.valid()) {
                console.log("mili");
                (new swagger.UserApi())
                    .userLoginPost({'payloadData': values},
                        function (response) {
                            console.log(response)
                        });
            } else {
                console.log("fuck");
            }
        };
    };

    render() {
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}