import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';


export default class ClicksChart extends Component {

    componentDidMount() {
        var chart = AmCharts.makeChart("clicks-chart", {
            "type": "serial",
            "theme": "light",
            "marginRight": 40,
            "marginLeft": 40,
            "fontFamily": "IRANSans",
            "autoMarginOffset": 20,
            "mouseWheelZoomEnabled":false,
            "dataDateFormat": "YYYY-MM-DD",
            "valueAxes": [{
                "labelsEnabled":false,
                "id": "v1",
                "axisAlpha": 0,
                "labelRotation":320
            }],
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "graphs": [{
                "id": "g1",
                "balloon":{
                    "drop":true,
                    "adjustBorderColor":false,
                    "color":"#ffffff"
                },
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "fontSize":"12px",
                "balloonText": "<span style='font-size:13px;'>[[category]] <br/> [[value]] کلیک</span>"
            }],
            "chartCursor": {
                "pan": true,
                "valueLineEnabled": false,
                "valueLineBalloonEnabled": false,
                "cursorAlpha":1,
                "cursorColor":"#258cbb",
                "limitToGraph":"g1",
                "valueLineAlpha":0.2,
                "valueZoomable":true
            },
            // "valueScrollbar":{
            //     "oppositeAxis":true,
            //     "offset":50,
            //     "scrollbarHeight":10
            // },
            // "chartScrollbar": {
            //     "autoGridCount": true,
            //     "graph": "g1",
            //     "scrollbarHeight": 40
            // },
            "categoryField": "category",
            "categoryAxis": {
                "gridPosition": "start",
                "dashLength": 1,
                "minorGridEnabled": true,
                "labelsEnabled":false,

            },
            "export": {
                "enabled": false
            },
            "dataProvider": [{
                "category": "چهارشنبه 1 شهریور",
                "value": 13
            }, {
                "category": "چهارشنبه 2 شهریور",
                "value": 11
            }, {
                "category": "چهارشنبه 3 شهریور",
                "value": 15
            }, {
                "category": "چهارشنبه 4 شهریور",
                "value": 16
            },
                {
                    "category": "چهارشنبه 4 شهریور",
                    "value": 16
                },{
                    "category": "چهارشنبه 5 شهریور",
                    "value": 18
                },
                {
                    "category": "چهارشنبه 24 شهریور",
                    "value": 81
                }]
        });
    }

    render() {
        return (
            <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="portlet light ">
                    <div className="portlet-title">
                        <div className="caption">
                            <span className="caption-subject bold uppercase font-dark">کلیک های انجام شده کمپین </span>
                        </div>
                        <div className="actions">
                            <div className="btn-group btn-group-devided" data-toggle="buttons">
                                <label className="btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm active">
                                    <input type="radio" name="options" className="toggle" id="option1" value="on"/>
                                    روزانه
                                </label>
                                <label className="btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm">
                                    <input type="radio" name="options" className="toggle" id="option2" value="on"/>
                                    هفتگی
                                </label>
                                <label className="btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm">
                                    <input type="radio" name="options" className="toggle" id="option2" value="on"/>
                                    ماهانه
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="portlet-body">
                        <div id="clicks-chart" className="CSSAnimationChart"></div>
                    </div>
                </div>
            </div>
        )
    }
}