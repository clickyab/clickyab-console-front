import React, {Component} from 'react';
import { Link } from 'react-router'
import {connect} from "react-redux";
import {store} from './../../redux/store';
import {select} from "../../functions/select";
import {getCorporationTitle} from "../../redux/helpers";
import {getFullName} from "../../redux/helpers";
import {getGravatarFromEmail} from "../../functions/gravatar";
import {getEmail} from "../../redux/helpers";


@connect()
export class Header extends Component {

    componentDidMount() {
        let userAvatar = getGravatarFromEmail(getEmail(),200);
        document.querySelector(".profile-userpic").setAttribute("src",userAvatar);
    }

    render() {
        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner ">
                    <div className="page-logo">
                        <a href="">
                            <img src="/img/logo_fa.svg" alt="logo" className="logo-default"/>
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
                            <li className="dropdown dropdown-user" >
                                <a href="./advertiser" className="dropdown-toggle" style={{'padding-left': '6px'}}>
                                    <span className="username username-hide-on-mobile">تبلیغ دهندگان</span>
                                </a>
                            </li>
                            <li className="dropdown dropdown-user">
                                <a href="./publisher" className="dropdown-toggle" style={{'padding-left': '6px'}}>
                                    <span className="username username-hide-on-mobile">ناشران</span>
                                </a>
                            </li>
                            <li className="dropdown dropdown-user">
                                <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                    <img alt="" className="img-circle profile-userpic" src="" />
                                    <span className="username username-hide-on-mobile">
                                        {select('user.personal.first_name') != null ?
                                            getFullName() : getCorporationTitle()
                                        }

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



