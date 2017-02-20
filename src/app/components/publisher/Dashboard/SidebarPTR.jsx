import React, {Component} from "react";
import {translatable} from "react-multilingual/dist";
import {Link, SidebarLinks} from "./../../../components/custom-link/CustomLink";

@translatable(
    ({
        dashboard, operations, campaigns, websites, applications,
        withdrawal, slots, potential, users, financial, access
    }) =>
        ({
            dashboard, operations, campaigns, websites, applications,
            withdrawal, slots, potential, users, financial, access
        })
)
export class Sidebar extends Component {
    componentDidMount() {
        document.title = "داشبورد نمایش دهنده";
    }

    render() {
        return (
            <div className='page-sidebar-wrapper'>
                <div className='page-sidebar navbar-collapse collapse'>
                    <SidebarLinks>
                        <Link to='/v1/publisher'>
                            <i className='fa fa-home'/>
                            <span className='title'>داشبورد ناشر</span>
                            <span className='selected'/>
                            <span className="selected"/>
                        </Link>

                        <Link to="/v1/publisher/channel">
                            <i className='fa fa-television'/>
                            <span className='title'>کانال‌ها</span>
                            <span className="selected"/>
                        </Link>

                        <Link to="/v1/publisher/user">
                            <i className='fa fa-user'/>
                            <span className='title'>مدیریت کاربران</span>
                            <span className="selected"/>
                        </Link>

                        <Link to="/v1/publisher/role">
                            <i className='fa fa-user'/>
                            <span className='title'> رول ها</span>
                            <span className="selected"/>
                        </Link>

                        <Link to="/v1/publisher/telegram">
                            <i className='fa fa-user'/>
                            <span className='title'>مدیریت کاربران تلگرام</span>
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



