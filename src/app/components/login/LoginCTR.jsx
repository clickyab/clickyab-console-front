import React, {Component} from 'react';
import LoginPTR from './LoginPTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {successfulLogin, failedLogin} from '../../redux/actions/login';
import {AlertBox} from "../../functions/notifications";

@connect()
class LoginCTR extends Component {
    SubmitCall = (values, form) => {
        let {dispatch} = this.props;
        if (form.valid()) {
            (new swagger.UserApi())
                .userLoginPost({
                        'payloadData': {
                            "email": values.email,
                            "password": values.password
                        }
                    },
                    function (a, b, c) {
                        console.log(a,b,c);
                        if (c.status == '200') {
                            dispatch(successfulLogin(b.email, b.token, b.user_id));
                            browserHistory.push('/publisher');
                        }
                        else if (c.status == '400') {
                            dispatch(failedLogin());
                            AlertBox("error", "اطلاعات وارد شده صحیح نمی‌باشد.");
                        }

                    });
        } else {
            console.log("***");
        }
    };


    render() {
        return (<LoginPTR SubmitCall={this.SubmitCall}/>);
    }
}

export default LoginCTR;