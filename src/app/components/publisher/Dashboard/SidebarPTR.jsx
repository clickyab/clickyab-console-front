import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';
import {Link} from 'react-router'

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
    render() {
        let {dashboard, operations, campaigns, websites, applications, withdrawal, slots, potential, users, financial, access} = this.props;
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

                        <li className='nav-item start active open'>
                            <Link to='/v1' className='nav-link nav-toggle'>
                                <i className='fa fa-home'/>
                                <span className='title'>داشبورد</span>
                                <span className='selected'/>
                                <span className='arrow open'/>
                            </Link>
                        </li>
                        <li className='nav-item  '>
                            <Link to="/v1/campaign" className='nav-link'>
                                <i className='fa fa-bullseye'/>
                                <span className='title'>کمپین ها</span>
                                <span className='arrow'/>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/v1/channel" className='nav-link nav-toggle'>
                                <i className='fa fa-television'/>
                                <span className='title'>کانال ها</span>
                                <span className='arrow'/>
                            </Link>
                        </li>
                        <li className='nav-item  '>
                            <Link to="/v1/category" className='nav-link nav-toggle'>
                                <i className='fa fa-folder-open'/>
                                <span className='title'>دسته بندی ها</span>
                                <span className='arrow'/>
                            </Link>
                        </li>
                        <li className='nav-item  '>
                            <Link to="/v1/user" className='nav-link nav-toggle'>
                                <i className='fa fa-user'/>
                                <span className='title'>مدیریت کاربران</span>
                                <span className='arrow'/>
                            </Link>
                        </li>
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



