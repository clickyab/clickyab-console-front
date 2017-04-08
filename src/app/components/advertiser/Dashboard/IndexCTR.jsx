import React, {Component} from "react";
import {Link} from "react-router";
import {translate} from "../../../functions/translate";
import {loading} from "../../../functions/loading";
import {select} from "../../../functions/select";
import {securify} from "../../../functions/securify";
require('jquery-sparkline/jquery.sparkline');
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/pie');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');

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

        let  chartdiv = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "light",
            "categoryField": "ad_name",
            "columnSpacing": 0,
            "gridAboveGraphs": true,
            "colors": ["#67b7dc", "#fdd400"],

            "fontFamily": "IRANSans,sans-serif",
            "rotate": false,
            "unitPosition":"left",
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "trendLines": [],
            // "mouseWheelZoomEnabled": true,
            "graphs": [
                {
                    "balloonText": "نمایش داده شده:[[viewed]]",
                    "fillAlphas": 0.8,
                    "id": "AmGraph-1",
                    "lineAlpha": 0.2,
                    "title": "viewed",
                    "type": "column",
                    "valueField": "viewed"
                },
                {
                    "balloonText": "باقی مانده:[[remaining]]",
                    "fillAlphas": 0.8,
                    "id": "AmGraph-2",
                    "lineAlpha": 0.2,
                    "title": "remaining",
                    "type": "column",
                    "valueField": "remaining"
                }
            ],
            // "chartScrollbar": {
            //     "autoGridCount": true,
            //     "graph": "g1",
            //     "scrollbarHeight": 40
            // },
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "position": "left",
                    "axisAlpha": 0,
                    "offset" : 10
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": select('advertiserCampaignChart'),

        });

        let pieChart = AmCharts.makeChart("pieChart", {
            "type": "pie",
            "theme": "light",
            "gridAboveGraphs": true,
            "fontFamily": "IRANSans,sans-serif",
            "dataProvider": select('advertiserSpentPerChannel'),
            "valueField": "spent",
            "titleField": "channel_name",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "  [[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30
        });
    }

    render() {
        return (
            <div className='page-content'>

                <div className='row'>
                    <div className='portlet light'>
                        <div className='portlet-title'>
                            <div className='caption'>
                                <span className='caption-subject bold uppercase font-dark'>{translate('Dashboard')}</span>
                            </div>
                            <div className="actions">
                                <div className="btn-group">
                                    <Link to="/v1/advertiser/campaign/create/step/name"
                                          className="btn btn-transparent blue btn-outline btn-circle btn-sm">{translate("New Campaign")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12 col-sm-12">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="icon-share font-red-sunglo hide"/>
                                    <span className="caption-subject font-dark  uppercase">{translate("Views Report")}</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div id="chartdiv" className='CSSAnimationChart'></div>
                            </div>
                        </div>
                    </div>

                    {securify(
                        () => <div className="col-lg-6 col-xs-12 col-sm-12">
                            <div className="portlet light bordered">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="icon-share font-red-sunglo hide"/>
                                        <span className="caption-subject font-dark  uppercase">{translate("Views Per Channel")}</span>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div id="pieChart" style={{width: '100%' , height: '500px'}} className='CSSAnimationChart'></div>
                                </div>
                            </div>
                        </div>,
                        ({user}, {canSeeAdvertiserPieChart}, run) => run(canSeeAdvertiserPieChart())
                    )}
                </div>
            </div>
        );
    }
}

AdvertiserDashboardPage.propTypes = {
	DashboardTitle: React.PropTypes.string,
};


