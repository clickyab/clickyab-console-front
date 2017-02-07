import React, {Component} from "react";
import MainLinksPublisherPTR from "./../../../components/publisher/Dashboard/MainLinksPublisherPTR";
import {loading} from "../../../functions/loading";
import {Link} from "react-router";

export default class PublisherDashboardPage extends Component {

    componentDidMount() {
        loading(false);
    }

    render() {
        let {DashboardTitle} = this.props;
        return (
            <div className="page-content">
                <div className="page-bar">
                    <ul className="page-breadcrumb pull-right">
                        <li>
                            <a href="index.html">داشبورد</a>
                            <i className="fa fa-circle"/>
                        </li>
                        <li>
                            <span>نمایش دهنده</span>
                        </li>
                    </ul>
                    <div className="page-toolbar">

                    </div>
                </div>
                <div className='row'>
                    <div className='portlet light bordered'>
                        <div className='portlet-title'>
                            <div className='caption'>
                                <span className='caption-subject bold uppercase font-dark'>نمایش دهنده ها</span>
                            </div>
                            <div className="actions">
                                <div className="btn-group">
                                    <Link to="/website"
                                          className="btn btn-transparent blue btn-outline btn-circle btn-sm">
                                        <i className="fa fa-plus"/> ساخت وب سایت جدید
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='portlet-body'>
                            <MainLinksPublisherPTR/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

PublisherDashboardPage.propTypes = {
    DashboardTitle: React.PropTypes.string,
};
