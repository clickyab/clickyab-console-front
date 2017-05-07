import React, {Component} from "react";
import {select} from "../../../functions/select";
require('jquery-sparkline/jquery.sparkline');
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/pie');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');

export class PieChart extends Component {
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

        }, ["pie"]);

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
        return <div id="pieChart" style={{width: '100%', height: '500px'}} className='CSSAnimationChart'/>
    }
}