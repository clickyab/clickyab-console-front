import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';
import { Link } from 'react-router'

@translatable(
    ({dashboard, operations, campaigns, websites, applications, withdrawal, slots, potential, users, financial, access}) =>
        ({dashboard, operations, campaigns, websites, applications, withdrawal, slots, potential, users, financial, access})
    )

export class Sidebar extends Component {

    render() {
        let {dashboard, operations, campaigns, websites, applications, withdrawal, slots, potential, users, financial, access} = this.props;
        return (
            <div className='page-sidebar-wrapper'>
                <div className='page-sidebar navbar-collapse collapse'>

                    <ul className='page-sidebar-menu  page-header-fixed ' data-keep-expanded='false' data-auto-scroll='true' data-slide-speed='200' style={{paddingTop: 20 + 'px'}}>
                        <li className='sidebar-toggler-wrapper hide'>
                            <div className='sidebar-toggler'>
                                <span/>
                            </div>
                        </li>

                        <li className='nav-item start active open'>
                            <Link to='/' className='nav-link nav-toggle'>
                                <i className='icon-home'/>
                                <span className='title'>{ dashboard }</span>
                                <span className='selected'/>
                                <span className='arrow open'/>
                            </Link>
                        </li>
                        <li className='heading'>
                            <h3 className='uppercase'>{ operations }</h3>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ campaigns }</span>
                                <span className='arrow'/>
                            </a>
                            <ul className='sub-menu'>
                                <li className='nav-item'>
                                    <Link to="/campaigns" className='nav-link'>
                                        <span className='title'>کمپین ها</span>
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/campaigns/campaignsId" className='nav-link'>
                                      <span className='title'>آی دی کمپین</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className='nav-item'>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ websites }</span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ applications }</span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ withdrawal } </span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ slots }</span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ potential }</span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ users }</span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ financial }</span>
                                <span className='arrow'/>
                            </a>
                        </li>
                        <li className='nav-item  '>
                            <a href='javascript:;' className='nav-link nav-toggle'>
                                <i className='icon-diamond'/>
                                <span className='title'>{ access }</span>
                                <span className='arrow'/>
                            </a>
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



