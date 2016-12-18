import React, {Component} from 'react';
import {persistStore, autoRehydrate} from 'redux-persist'
import UserProfilePTR from './UserProfilePTR';
import swagger from './../../swagger/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {successfulLogin, failedLogin} from '../../redux/actions/login';
import {AlertBox} from "../../functions/notifications";
import {GetGravatar} from "../../functions/gravatar";
let Ladda = require('ladda/js/ladda');

@connect()
class UserProfileCTR extends Component {

    SubmitPersonal = (values, PersonalForm) => {
        let {dispatch , getState} = this.props;
        console.log(state);
        if (PersonalForm.valid()) {
            let loadingProgress = Ladda.create(document.querySelector('.personal-form button[type=submit]'));
            loadingProgress.start();
            ( new swagger.UserApi())
                .userProfilePost( "1:326f6314eaf7a3ead0b2b8e1ee981246516c08da",{
                    "payloadData": {
                            "personal": values
                        }
                    },
                    function (error, data, response) {
                        if (response.statusCode == '200') {
                            loadingProgress.stop();
                            AlertBox("success",response.text);
                        }
                        else if (response.statusCode == '400') {
                            loadingProgress.stop();
                            AlertBox("error",response.text);
                        }
                    });
        } else {
            console.log("***");
        }
    };

    render() {
        return (<UserProfilePTR SubmitPersonal={this.SubmitPersonal} />);
    }
}
export default UserProfileCTR;