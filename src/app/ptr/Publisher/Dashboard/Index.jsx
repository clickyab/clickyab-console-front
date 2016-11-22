import React, {Component} from 'react"';
import {translatable} from 'react-multilingual/dist';
import TotalConstAdsBox from './TotalConstAds';
import TotalAdsBox from './TotalAdsBox';
import TotalClicksBox from './TotalClicksBox';
import TotalIncomeBox from './TotalIncomeBox';
import MainLinksPublisher from './MainLinksPublisher';
import ClicksChart from './ClicksChart';
import BudgetChart from './BudgetChart';
import RangePicker from './RangePicker';
import moment from 'moment-jalali';


export default class PublisherDashboardPage extends Component {

    componentDidMount() {
        $(document).ready(function () {
            $('.ranges li:last-child' ).hide();
        });
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
                        <RangePicker/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <h1 className="page-title">نمایش دهنده ها</h1>
                    </div>
                    <div className="top-action-header">
                        <button type="button" className="btn blue-madison pull-left">ساخت وب سایت جدید</button>
                    </div>
                </div>
                <div className="row">
                        <TotalConstAdsBox/>
                        <TotalAdsBox/>
                        <TotalClicksBox/>
                        <TotalIncomeBox/>
                </div>
                    <MainLinksPublisher/>
                <div className="row">
                    <ClicksChart/>
                    <BudgetChart/>
                </div>
            </div>
        );
    }

}