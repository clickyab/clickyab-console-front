import React, {Component} from "react";
import {select} from "../../../functions/select";
require('jquery-sparkline/jquery.sparkline');
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/pie');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');

export class SerialChart extends Component {
    componentDidMount() {
        AmCharts.addInitHandler(function (chart) {

            // check if data is mepty
            if (chart.dataProvider === undefined || chart.dataProvider.length === 0) {
                // add some bogus data
                let dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = "";
                dp[chart.categoryField] = "";
                chart.dataProvider.push(dp);

                dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = "";
                dp[chart.categoryField] = "";
                chart.dataProvider.push(dp);

                dp = {};
                dp[chart.titleField] = "";
                dp[chart.valueField] = "";
                dp[chart.categoryField] = "";
                chart.dataProvider.push(dp);

                // disable slice labels
                chart.labelsEnabled = false;

                // add label to let users know the chart is empty
                chart.addLabel(0, '50%', 'داده ای برای نمایش وجود ندارد', 'center', '16');

                // dim the whole chart
                chart.alpha = 0.3;
            }

        }, ["serial"]);

        let chartdiv = AmCharts.makeChart("chartdiv", {
            "type": "serial",
            "theme": "light",
            "categoryField": "ad_name",
            "columnSpacing": 0,
            "gridAboveGraphs": true,
            "colors": ["#67b7dc", "#fdd400"],

            "fontFamily": "IRANSans,sans-serif",
            "rotate": false,
            "unitPosition": "left",
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
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "position": "left",
                    "axisAlpha": 0,
                    "offset": 10
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": select('advertiserCampaignChart'),

        });
    }

    render() {
        return <div id="chartdiv" className='CSSAnimationChart'/>;
    }
}