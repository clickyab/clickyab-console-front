import React, {Component} from "react";
import {Link} from "react-router";
import {translatable} from "react-multilingual/dist";
import {loading} from "../../../functions/loading";
require('jquery-sparkline/jquery.sparkline');
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/pie');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');

import {PersianNumber} from "react-persian";

@translatable(({
    DashboardTitle
}) => ({
    DashboardTitle
}))
export default class AdvertiserDashboardPage extends Component {
    componentDidMount() {
        loading(false);

        AmCharts.addInitHandler(function(chart) {

            // check if data is mepty
            if (chart.dataProvider === undefined || chart.dataProvider.length === 0) {
                // add some bogus data
                var dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = "";
                dp[chart.categoryField] = "";
                chart.dataProvider.push(dp)

                var dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = "";
                dp[chart.categoryField] = "";
                chart.dataProvider.push(dp)

                var dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = "";
                dp[chart.categoryField] = "";
                chart.dataProvider.push(dp)

                // disable slice labels
                chart.labelsEnabled = false;

                // add label to let users know the chart is empty
                chart.addLabel(0, '50%', 'داده ای برای نمایش وجود ندارد', 'center','16');

                // dim the whole chart
                chart.alpha = 0.3;
            }

        }, ["pie" , "serial"]);

        AmCharts.makeChart( "barChart", {
            "type": "serial",
            "addClassNames": true,
            "theme": "light",
            "fontFamily": "IRANSans,sans-serif",
            "autoMargins": false,
            "marginLeft": 30,
            "marginRight": 8,
            "marginTop": 10,
            "marginBottom": 26,
            "balloon": {
                "adjustBorderColor": false,
                "horizontalPadding": 10,
                "verticalPadding": 8,
                "color": "#ffffff"
            },

            "dataProvider": [ {
                "channelName": "کانال یک",
                "income": 23.5
            }, {
                "channelName": "کانال دو",
                "income": 26.2
            }, {
                "channelName": "کانال سه",
                "income": 30.1
            }, {
                "channelName": "کانال چهار",
                "income": 29.5
            }, {
                "channelName": "کانال پنج",
                "income": 30.6

            }, {
                "channelName": "کانال شش",
                "income": 34.1
            } ],
            "valueAxes": [ {
                "axisAlpha": 0,
                "position": "left",
                "offset" : 10
            } ],
            "startDuration": 1,
            "graphs": [ {
                "alphaField": "alpha",
                "balloonText": "<span style='font-size:12px;'>[[title]] در [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "fillAlphas": 1,
                "title": "آمار بازدید",
                "type": "column",
                "valueField": "income"
            }, {
                "id": "graph2",
                "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
                "bullet": "round",
                "lineThickness": 3,
                "bulletSize": 7,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "Expenses",
                "valueField": "expenses",
            } ],
            "categoryField": "channelName",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "tickLength": 0
            }
        } );
    }

    render() {
        return (
            <div className='page-content'>

                <div className='row'>
                    <div className='portlet light'>
                        <div className='portlet-title'>
                            <div className='caption'>
                                <span className='caption-subject bold uppercase font-dark'>داشبورد نمایش دهنده</span>
                            </div>
                            <div className="actions">
                                <div className="btn-group">
                                    <Link to="/v1/publisher/channel"
                                          className="btn btn-transparent blue btn-outline btn-circle btn-sm">لیست کانال های شما
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="dashboard-stat2 bordered">
                            <div className="display">
                                <div className="number">
                                    <h3 className="font-blue-sharp">
                                        <span><PersianNumber>15</PersianNumber> کانال</span>
                                    </h3>
                                    <small>تبلیغات در حال نمایش</small>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-thumbs-o-up"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="dashboard-stat2 bordered">
                            <div className="display">
                                <div className="number">
                                    <h3 className="font-blue-sharp">
                                        <span><PersianNumber>15</PersianNumber> کانال</span>
                                    </h3>
                                    <small>تبلیغات در صف نمایش</small>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-hand-paper-o"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12 col-sm-12">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="icon-share font-red-sunglo hide"/>
                                    <span className="caption-subject font-dark  uppercase">آمار کانال های نمایش داده شده</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div id="barChart"  className='CSSAnimationChart'></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xs-12 col-sm-12">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="icon-share font-red-sunglo hide"/>
                                    <span className="caption-subject font-dark  uppercase">آمار نمایش کمپین ها</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="dashboard-stat dashboard-stat-v2 blue">
                                            <div className="visual">
                                                <i className="fa fa-thumbs-o-up"/>
                                            </div>
                                            <div className="details">
                                                <div className="number">
                                                    <span><PersianNumber>15</PersianNumber> کانال</span>
                                                </div>
                                                <div className="desc"> کانال تایید شده </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row margin-top-20">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="dashboard-stat dashboard-stat-v2 green">
                                            <div className="visual">
                                                <i className="fa fa-clock-o"/>
                                            </div>
                                            <div className="details">
                                                <div className="number">
                                                    <span><PersianNumber>15</PersianNumber> کانال</span>
                                                </div>
                                                <div className="desc"> کانال در انتظار تایید </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="dashboard-stat dashboard-stat-v2 red">
                                            <div className="visual">
                                                <i className="fa fa-times"/>
                                            </div>
                                            <div className="details">
                                                <div className="number">
                                                    <span><PersianNumber>15</PersianNumber> کانال</span>
                                                </div>
                                                <div className="desc"> کانال رد شده </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
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


