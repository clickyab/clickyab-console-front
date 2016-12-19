import React, {Component} from 'react';
import $ from 'jquery';

export default class ProfileSidebar extends Component {

    componentDidMount() {
    }


    render() {
        return(
            <div className="profile-sidebar">
                <div className="portlet light profile-sidebar-portlet ">
                    <div className="profile-userpic">
                        <img src="/img/pages/media/profile/profile_user.jpg" className="img-responsive" alt=""/> </div>
                    <div className="profile-usertitle">
                        <div className="profile-usertitle-name"> میلاد حیدری </div>
                    </div>
                    <div className="profile-userbuttons">
                        <button type="button" className="btn btn-circle red btn-sm">خروج</button>
                    </div>
                    <div className="profile-usermenu">
                        <ul className="nav">
                            <li>
                                <a href="page_user_profile_1.html">
                                    <i className="icon-home"/> شارژ حساب </a>
                            </li>
                            <li className="active">
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