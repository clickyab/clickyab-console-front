import React, {Component} from "react";
import $ from "jquery";
import TotalConstAdsBoxPTR from "./../../../components/publisher/Dashboard/TotalConstAdsBoxPTR";
import TotalAdsBoxPTR from "./../../../components/publisher/Dashboard/TotalAdsBoxPTR";
import TotalClicksBoxPTR from "./../../../components/publisher/Dashboard/TotalClicksBoxPTR";
import TotalIncomeBoxPTR from "./../../../components/publisher/Dashboard/TotalIncomeBoxPTR";
import MainLinksPublisherPTR from "./../../../components/publisher/Dashboard/MainLinksPublisherPTR";
import ClicksChartPTR from "./../../../components/publisher/Dashboard/ClicksChartPTR";
import BudgetChartPTR from "./../../../components/publisher/Dashboard/BudgetChartPTR";
import {loading} from "../../../functions/loading";

export default class PublisherDashboardPage extends Component {

    componentDidMount() {
        loading(false);
        $(document).ready(function () {
            $('.ranges li:last-child').hide();
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
                    <TotalConstAdsBoxPTR/>
                    <TotalAdsBoxPTR/>
                    <TotalClicksBoxPTR/>
                    <TotalIncomeBoxPTR/>
                </div>
                <MainLinksPublisherPTR/>
                <div className="row">
                    <ClicksChartPTR/>
                    <BudgetChartPTR/>
                </div>
            </div>
        );
    }

}