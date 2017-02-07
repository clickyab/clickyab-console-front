import React, {Component} from "react";

export class Menu extends Component {
    render() {
        return (
            <div className="page-header-menu">
                <div className="container-fluid">
                    <div className="hor-menu pull-left">
                        <ul className="nav navbar-nav">
                            <li aria-haspopup="true" className="menu-dropdown classic-menu-dropdown">
                                <a className="" href="/billing">
                                    <i className="fa fa-credit-card ml1"/> اعتبار شما : ‌853,311 ریال
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="hor-menu">
                        <ul className="nav navbar-nav">
                            <li aria-haspopup="true" className="menu-dropdown classic-menu-dropdown active">
                                <a href="javascript:;"> داشبورد
                                    <span className="arrow"/>
                                </a>
                            </li>
                            <li aria-haspopup="true" className="menu-dropdown mega-menu-dropdown  ">
                                <a href="javascript:;"> کمپین ها
                                    <span className="arrow"/>
                                </a>
                            </li>
                            <li aria-haspopup="true" className="menu-dropdown classic-menu-dropdown ">
                                <a href="javascript:;"> وب سایت ها
                                    <span className="arrow"/>
                                </a>
                            </li>
                            <li aria-haspopup="true" className="menu-dropdown mega-menu-dropdown  mega-menu-full">
                                <a href="javascript:;"> اپلیکیشن ها
                                    <span className="arrow"/>
                                </a>
                            </li>
                            <li aria-haspopup="true" className="menu-dropdown classic-menu-dropdown ">
                                <a href="javascript:;">
                                    <i className="icon-briefcase"/> صفحات دیگر
                                    <span className="arrow"/>
                                </a>
                                <ul className="dropdown-menu pull-left">
                                    <li aria-haspopup="true" className="dropdown-submenu ">
                                        <a href="javascript:;" className="nav-link nav-toggle ">
                                            <i className="icon-basket"/> eCommerce
                                            <span className="arrow"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li aria-haspopup="true" className=" ">
                                                <a href="ecommerce_index.html" className="nav-link ">
                                                    <i className="icon-home"/> Dashboard </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="ecommerce_orders.html" className="nav-link ">
                                                    <i className="icon-basket"/> Orders </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="ecommerce_orders_view.html" className="nav-link ">
                                                    <i className="icon-tag"/> Order View </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="ecommerce_products.html" className="nav-link ">
                                                    <i className="icon-graph"/> Products </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="ecommerce_products_edit.html" className="nav-link ">
                                                    <i className="icon-graph"/> Product Edit </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li aria-haspopup="true" className="dropdown-submenu ">
                                        <a href="javascript:;" className="nav-link nav-toggle ">
                                            <i className="icon-docs"/> Apps
                                            <span className="arrow"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li aria-haspopup="true" className=" ">
                                                <a href="app_todo.html" className="nav-link ">
                                                    <i className="icon-clock"/> Todo 1 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="app_todo_2.html" className="nav-link ">
                                                    <i className="icon-check"/> Todo 2 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="app_inbox.html" className="nav-link ">
                                                    <i className="icon-envelope"/> Inbox </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="app_calendar.html" className="nav-link ">
                                                    <i className="icon-calendar"/> Calendar </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="app_ticket.html" className="nav-link ">
                                                    <i className="icon-notebook"/> Support </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li aria-haspopup="true" className="dropdown-submenu ">
                                        <a href="javascript:;" className="nav-link nav-toggle ">
                                            <i className="icon-user"/> User
                                            <span className="arrow"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_user_profile_1.html" className="nav-link ">
                                                    <i className="icon-user"/> Profile 1 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_user_profile_1_account.html" className="nav-link ">
                                                    <i className="icon-user-female"/> Profile 1 Account </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_user_profile_1_help.html" className="nav-link ">
                                                    <i className="icon-user-following"/> Profile 1 Help </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_user_profile_2.html" className="nav-link ">
                                                    <i className="icon-users"/> Profile 2 </a>
                                            </li>
                                            <li aria-haspopup="true" className="dropdown-submenu ">
                                                <a href="javascript:;" className="nav-link nav-toggle">
                                                    <i className="icon-notebook"/> Login
                                                    <span className="arrow"/>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="">
                                                        <a href="page_user_login_1.html" className="nav-link "
                                                           target="_blank"> Login Page 1 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_user_login_2.html" className="nav-link "
                                                           target="_blank"> Login Page 2 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_user_login_3.html" className="nav-link "
                                                           target="_blank"> Login Page 3 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_user_login_4.html" className="nav-link "
                                                           target="_blank"> Login Page 4 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_user_login_5.html" className="nav-link "
                                                           target="_blank"> Login Page 5 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_user_login_6.html" className="nav-link "
                                                           target="_blank"> Login Page 6 </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_user_lock_1.html" className="nav-link " target="_blank">
                                                    <i className="icon-lock"/> Lock Screen 1 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_user_lock_2.html" className="nav-link " target="_blank">
                                                    <i className="icon-lock-open"/> Lock Screen 2 </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li aria-haspopup="true" className="dropdown-submenu ">
                                        <a href="javascript:;" className="nav-link nav-toggle ">
                                            <i className="icon-social-dribbble"/> General
                                            <span className="arrow"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_about.html" className="nav-link ">
                                                    <i className="icon-info"/> About </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_contact.html" className="nav-link ">
                                                    <i className="icon-call-end"/> Contact </a>
                                            </li>
                                            <li aria-haspopup="true" className="dropdown-submenu ">
                                                <a href="javascript:;" className="nav-link nav-toggle">
                                                    <i className="icon-notebook"/> Portfolio
                                                    <span className="arrow"/>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="">
                                                        <a href="page_general_portfolio_1.html" className="nav-link ">
                                                            Portfolio 1 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_portfolio_2.html" className="nav-link ">
                                                            Portfolio 2 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_portfolio_3.html" className="nav-link ">
                                                            Portfolio 3 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_portfolio_4.html" className="nav-link ">
                                                            Portfolio 4 </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li aria-haspopup="true" className="dropdown-submenu ">
                                                <a href="javascript:;" className="nav-link nav-toggle">
                                                    <i className="icon-magnifier"/> Search
                                                    <span className="arrow"/>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="">
                                                        <a href="page_general_search.html" className="nav-link "> Search
                                                            1 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_search_2.html" className="nav-link ">
                                                            Search 2 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_search_3.html" className="nav-link ">
                                                            Search 3 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_search_4.html" className="nav-link ">
                                                            Search 4 </a>
                                                    </li>
                                                    <li className="">
                                                        <a href="page_general_search_5.html" className="nav-link ">
                                                            Search 5 </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_pricing.html" className="nav-link ">
                                                    <i className="icon-tag"/> Pricing </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_faq.html" className="nav-link ">
                                                    <i className="icon-wrench"/> FAQ </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_blog.html" className="nav-link ">
                                                    <i className="icon-pencil"/> Blog </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_blog_post.html" className="nav-link ">
                                                    <i className="icon-note"/> Blog Post </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_invoice.html" className="nav-link ">
                                                    <i className="icon-envelope"/> Invoice </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_general_invoice_2.html" className="nav-link ">
                                                    <i className="icon-envelope"/> Invoice 2 </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li aria-haspopup="true" className="dropdown-submenu ">
                                        <a href="javascript:;" className="nav-link nav-toggle ">
                                            <i className="icon-settings"/> System
                                            <span className="arrow"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_system_coming_soon.html" className="nav-link "
                                                   target="_blank"> Coming Soon </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_system_404_1.html" className="nav-link "> 404 Page 1 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_system_404_2.html" className="nav-link " target="_blank">
                                                    404 Page 2 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_system_404_3.html" className="nav-link " target="_blank">
                                                    404 Page 3 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_system_500_1.html" className="nav-link "> 500 Page 1 </a>
                                            </li>
                                            <li aria-haspopup="true" className=" ">
                                                <a href="page_system_500_2.html" className="nav-link " target="_blank">
                                                    500 Page 2 </a>
                                            </li>
                                        </ul>
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

export default Menu;



