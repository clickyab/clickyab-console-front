import React, {Component} from "react";
import {Link} from "react-router";
import {translatable} from "react-multilingual/dist";
import {loading} from "../../../functions/loading";


@translatable(({
    DashboardTitle
}) => ({
    DashboardTitle
}))
export default class AdvertiserDashboardPage extends Component {
    componentDidMount() {
        loading(false);
    }

    render() {
        let {DashboardTitle} = this.props;
        return (
            <div className='page-content'>

                <div className='page-bar'>
                    <ul className='page-breadcrumb pull-right'>
                        <li>
                            <a href='index.html'>داشبورد</a>
                            <i className='fa fa-circle'/>
                        </li>
                        <li>
                            <span>کمپین های من</span>
                        </li>
                    </ul>
                </div>
                <div className='row'>
                    <div className='portlet light bordered'>
                        <div className='portlet-title'>
                            <div className='caption'>
                                <span className='caption-subject bold uppercase font-dark'>کمپین ها</span>
                            </div>
                            <div className="actions">
                                <div className="btn-group">
                                    <Link to="/v1/advertiser/campaign/create/step/name"
                                          className="btn btn-transparent blue btn-outline btn-circle btn-sm">
                                        <i className="fa fa-plus"/> ساخت کمپین جدید
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='portlet-body'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AdvertiserDashboardPage.propTypes = {
    DashboardTitle: React.PropTypes.string,
};


