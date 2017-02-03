import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';
import SidebarLink from './../../../components/custom-link/CustomLink'

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
                        <SidebarLink to='/v1/advertiser'>
                            <i className='fa fa-home'/>
                            <span className='title'>داشبورد تبلیغ کننده</span>
                            <span className='selected'/>
                            <span className="selected"/>
                            <span className='arrow open'/>
                        </SidebarLink>

                        <SidebarLink to="/v1/advertiser/campaign">
                            <i className='fa fa-bullseye'/>
                            <span className='title'>کمپین‌ها</span>
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



