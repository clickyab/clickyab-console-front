import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {select} from "../../functions/select";
import {getCorporationTitle, getEmail, getFullName, getToken} from "../../redux/helpers";
import {getGravatarFromEmail} from "../../functions/gravatar";
import SwitcherCTR from "./SwitcherCTR";
import {logout} from "../../redux/actions/login";
import {updateUserInformation} from "../../redux/actions/user";
import {asyncRemoveLocalStorageAction, flush, updateLocalStorageAction} from "../../redux/actions/index";
import {navigate} from "../../functions/navigate";
import swagger from "./../../swagger/index";
import {AlertBox} from "../../functions/notifications";
import NotificationsDropDown from "../notifications/NotificationsDropDown";
import CreditMenu from "./CreditMenu";
import {translate} from "../../functions/translate";

@connect(({user}) => ({user}))
export default class Header extends Component {
    componentDidMount() {
        let userAvatar = getGravatarFromEmail(getEmail(), 200);
        document.querySelector(".profile-userpic").setAttribute("src", userAvatar);
    }

    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(logout(user));
        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorageAction());
        dispatch(asyncRemoveLocalStorageAction());
        navigate('/v1/login');
        dispatch(flush());
    }

    LogoutCallback({data, response}) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
        } else if (response.statusCode == '400') {
            AlertBox("error", "اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید");
        }
    }1

    LogoutCall() {
        (new swagger.UserApi())
            .userLogoutGet(getToken())
            .then(response => this.LogoutCallback(response));
    }

    SubmitLogout = () => {
        this.LogoutCall()
    };

    render() {
        let initData;
        if ((select('user.personal.first_name')) != null) {
            initData = getFullName();
        } else {
            initData = getCorporationTitle();
        }

        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner ">
                    <div className="page-logo">
                        <a href="">
                            <img src="/img/logo_fa_white.svg" alt="logo" className="logo-default"/>
                        </a>
                        <div className="menu-toggler sidebar-toggler">
                            <span/>
                        </div>
                    </div>
                    <div id="server-condition"/>
                    <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse"
                       data-target=".navbar-collapse">
                        <span/>
                    </a>
                    <div className="top-menu">
                        <ul className="nav navbar-nav pull-right">

                            <SwitcherCTR />

                            <NotificationsDropDown />

                            <li className="dropdown dropdown-user">
                                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown"
                                   data-hover="dropdown" data-close-others="true">
                                    <img alt="" className="img-circle profile-userpic" src=""/>
                                    <span className="username username-hide-on-mobile">
                                        {initData}
                                    </span>
                                    <i className="fa fa-angle-down"/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-default">
                                    <CreditMenu />
                                    <li>
                                        <Link to="/v1/profile">
                                            <i className="icon-user"/> {translate('My Profile')} </Link>
                                    </li>
                                    <li className="divider"/>
                                    <li>
                                        <a onClick={this.SubmitLogout.bind(this)}>
                                            <i className="icon-key"/> {translate('Log Out')} </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    dispatch: PropTypes.func
};



