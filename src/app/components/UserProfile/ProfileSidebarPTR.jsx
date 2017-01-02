import React, {Component} from 'react';
import {getGravatarFromEmail} from "../../functions/gravatar";
import {getEmail , getCorporationTitle , getFullName} from './../../redux/helpers'
import {select} from "./../../functions/select";
import {connect} from "react-redux";

export default class ProfileSidebarPTR extends Component {

    componentDidMount() {
        let userAvatar = getGravatarFromEmail(getEmail(),200);
        document.querySelector(".profile-userpic img").setAttribute("src",userAvatar);
    }
    render() {
        let initData;
        if((select('user.personal.first_name')) != null) {
            initData = getFullName();
        } else {
            initData = getCorporationTitle();
        }
        return(
            <div className="profile-sidebar">
                <div className="portlet light profile-sidebar-portlet ">
                    <div className="profile-userpic">
                        <img src="" className="img-responsive" alt=""/> </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name"> {initData}  </div>
                    </div>
                    <div className="profile-userbuttons">
                        <button type="button" className="btn btn-circle red btn-sm logout-btn" onClick={this.props.SubmitLogout.bind(this)}>خروج</button>
                    </div>
                    <div className="profile-usermenu">
                        <ul className="nav">
                            <li>
                                <a href="page_user_profile_1.html">
                                    <i className="icon-home"/> شارژ حساب </a>
                            </li>
                            <li className="">
                                <a href="page_user_profile_1_account.html">
                                    <i className="icon-settings"/> برداشت حساب </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}