import React, {Component} from "react";
import {translatable} from "react-multilingual/dist";
import SidebarLink from "./../../../components/custom-link/CustomLink";
import {Link} from 'react-router';

@translatable(
    ({dashboard, operations, campaigns, websites, applications, withdrawal, slots, potential, users, financial, access}) =>
        ({
            dashboard,
            operations,
            campaigns,
            websites,
            applications,
            withdrawal,
            slots,
            potential,
            users,
            financial,
            access
        })
)
export class Sidebar extends Component {
    componentDidMount() {
        document.title = "داشبورد تبلیغ دهنده";
    }


    render() {
        return (
            <div className='page-sidebar-wrapper'>
                <div className='page-sidebar navbar-collapse collapse'>

                    <ul className='page-sidebar-menu  page-header-fixed ' data-keep-expanded='false'
                        data-auto-scroll='true' data-slide-speed='200' style={{paddingTop: 20 + 'px'}}>
                        <li className='sidebar-toggler-wrapper hide'>
                            <div className='sidebar-toggler'>
                                <span/>
                            </div>
                        </li>
                        <SidebarLink to='/v1/advertiser'>
                            <i className='fa fa-home'/>
                            <span className='title'>داشبورد تبلیغ کننده</span>
                            <span className='selected'/>
                            <span className="selected"/>
                            <span className='arrow open'/>
                        </SidebarLink>
                        <SidebarLink to="/v1/advertiser/telegram">
                            <i className='fa fa-user'/>
                            <span className='title'>مدیریت کاربران تلگرام</span>
                            <span className="selected"/>
                            <span className='arrow open'/>
                        </SidebarLink>
                        <li className="heading">
                            <h3>کمپین‌ها</h3>
                        </li>
                        <SidebarLink to='/v1/advertiser/campaign/create/step/name'>
                            <i className='fa fa-plus-circle'/>
                            <span className='title'>افزودن کمپین</span>
                            <span className='selected'/>
                            <span className="selected"/>
                            <span className='arrow open'/>
                        </SidebarLink>
                        <SidebarLink to='/v1/advertiser/campaign'>
                            <i className='fa fa-list'/>
                            <span className='title'>لیست کمپین</span>
                            <span className='selected'/>
                            <span className="selected"/>
                            <span className='arrow open'/>
                        </SidebarLink>

                    </ul>
                </div>

            </div>
        );
    }
}


Sidebar.propTypes = {
    dashboard: React.PropTypes.string,
    operations: React.PropTypes.string,
    campaigns: React.PropTypes.string,
    websites: React.PropTypes.string,
    applications: React.PropTypes.string,
    withdrawal: React.PropTypes.string,
    potential: React.PropTypes.string,
    users: React.PropTypes.string,
    financial: React.PropTypes.string,
    access: React.PropTypes.string,
    slots: React.PropTypes.string
};


export default Sidebar;



