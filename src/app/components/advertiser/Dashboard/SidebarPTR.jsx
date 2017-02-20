import React, {Component} from "react";
import {translatable} from "react-multilingual/dist";
import {Link, SidebarLinks} from "./../../../components/custom-link/CustomLink";

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
                        <SidebarLinks>
                            <Link to='/v1/advertiser' activeClassName='active'>
                                <i className='fa fa-home'/>
                                <span className='title'>داشبورد تبلیغ کننده</span>
                                <span className='selected'/>
                                <span className="selected"/>
                            </Link>

                            <Link to="/v1/advertiser/telegram" activeClassName='active'>
                                <i className='fa fa-user'/>
                                <span className='title'>مدیریت کاربران تلگرام</span>
                                <span className="selected"/>
                            </Link>

                            <li className="heading">
                                <h3>کمپین‌ها</h3>
                            </li>
                            <Link to='/v1/advertiser/campaign/create/step/name' activeClassName='active'>
                                <i className='fa fa-plus-circle'/>
                                <span className='title'>افزودن کمپین</span>
                                <span className='selected'/>
                                <span className="selected"/>
                            </Link>

                            <Link to='/v1/advertiser/campaign' activeClassName='active'>
                                <i className='fa fa-list'/>
                                <span className='title'>لیست کمپین</span>
                                <span className='selected'/>
                                <span className="selected"/>
                            </Link>
                        </SidebarLinks>
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



