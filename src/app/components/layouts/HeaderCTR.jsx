import React, {Component} from 'react';
import { Link } from 'react-router'
import {connect} from "react-redux";
import {store} from './../../redux/store';
import {select} from "../../functions/select";
import {getCorporationTitle, getToken} from "../../redux/helpers";
import {getFullName} from "../../redux/helpers";
import {getGravatarFromEmail} from "../../functions/gravatar";
import {getEmail} from "../../redux/helpers";
import SwitcherCTR from './SwitcherCTR';
import {logout} from "../../redux/actions/login";
import {updateUserInformation} from "../../redux/actions/user";
import {updateLocalStorageAction, asyncRemoveLocalStorageAction} from "../../redux/actions/index";
import {navigate} from "../../functions/navigate";
import swagger from './../../swagger/index';
import {AlertBox} from "../../functions/notifications";

@connect(({user}) => ({user}))
export class Header extends Component {

    componentDidMount() {
        let userAvatar = getGravatarFromEmail(getEmail(),200);
        document.querySelector(".profile-userpic").setAttribute("src",userAvatar);
    }

    loadingProgress;

    editProfileSuccessfullyDispatchers(user) {
        let {dispatch} = this.props;

        dispatch(logout(user));
        dispatch(updateUserInformation(user));
        dispatch(updateLocalStorageAction());
        dispatch(asyncRemoveLocalStorageAction());
        navigate('/v1/login');
    }


    LogoutCallback({error, data, response}) {
        if (response.statusCode == '200') {
            this.editProfileSuccessfullyDispatchers(Object.assign({}, data));
        } else if (response.statusCode == '400') {
            AlertBox("error","اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید");
        }
    }
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
        if((select('user.personal.first_name')) != null) {
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
                    <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                        <span/>
                    </a>
                    <div className="top-menu">
                        <ul className="nav navbar-nav pull-right">

                            <SwitcherCTR />

                            <li className="dropdown dropdown-user">
                                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                    <img alt="" className="img-circle profile-userpic" src="" />
                                    <span className="username username-hide-on-mobile">
                                        {initData}
                                    </span>
                                    <i className="fa fa-angle-down"/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-default">
                                    <li>
                                        <Link to="/v1/profile">
                                            <i className="icon-user"/> پروفایل من </Link>
                                    </li>
                                    <li>
                                        <a href="app_calendar.html">
                                            <i className="icon-calendar"/> حسابداری </a>
                                    </li>
                                    <li className="divider"> </li>
                                    <li>
                                        <a onClick={this.SubmitLogout.bind(this)}>
                                            <i className="icon-key"/> خروج </a>
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

export default Header;



