import React, {Component} from 'react';

export class Header extends Component {

    render() {
        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner ">

                    <div className="page-logo">
                        <a href="index.html">
                            <img src="/img/logo_fa.png" alt="logo" className="logo-default" /> </a>
                    </div>
           
                    <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                        <span/>
                    </a>
                    <div className="top-menu pull-right user-type">
                        <ul className="nav navbar-nav pull-right">
                            <li className="swicth-user publisher-type">
                                <a href="javascript:;" className="active">
                                    <span className="username"> نمایش دهنده </span>
                                </a>
                            </li>
                            <li className="swicth-user advertiser-type">
                                <a href="javascript:;" className="">
                                    <span className="username username-hide-on-mobile"> تبلیغ دهنده</span>
                                </a>
                            </li>
                        </ul>
                    </div>
            </div>
         </div>

        );
    }
}

export default Header;



