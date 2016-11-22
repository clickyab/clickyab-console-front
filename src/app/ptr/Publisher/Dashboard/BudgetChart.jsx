import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';


export default class BudgetChart extends Component {

    componentDidMount() {
        var chart = AmCharts.makeChart("budget_chart", {
            "type": "serial",
            "addClassNames": true,
            "theme": "light",
            "fontFamily": "IRANSans",
            "path": "../assets/global/plugins/amcharts/ammap/images/",
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

            "dataProvider": [{
                "date": "شنبه",
                "badge": 500000,
                "expenses": 400000
            }, {
                "date": "یک شنبه",
                "badge": 400000,
                "expenses": 340000
            }, {
                "date": "دوشنبه",
                "badge": 300000,
                "expenses": 290000
            }, {
                "date": "سه شنبه",
                "badge": 800000,
                "expenses": 750000
            }, {
                "date": "چهارشنبه",
                "badge": 900000,
                "expenses": 890000,
            },{
                "date": "پنج شنبه",
                "badge": 100000,
                "expenses": 100000,
            },{
                "date": "جمعه",
                "badge": 700000,
                "expenses": 690000,
                "dashLengthColumn": 5,
                "alpha": 0.2,
                "additional": "(projection)"
            }],
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left",
                "labelsEnabled":false,
            }],
            "startDuration": 1,
            "graphs": [{
                "alphaField": "alpha",
                "balloonText": "<span style='font-length:12px;'>بودجه در روز   [[date]]:<br><span style='font-length:13px;'>[[value]]</span></span>",
                "fillAlphas": 1,
                "title": "بودجه",
                "type": "column",
                "valueField": "badge",
                "dashLengthField": "dashLengthColumn"
            }, {
                "id": "graph2",
                "balloonText": "<span style='font-length:12px;'>[[title]] در [[date]]:<br><span style='font-length:20px;'>[[value]]</span> [[additional]]</span>",
                "bullet": "round",
                "lineThickness": 3,
                "bulletSize": 7,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "میانگین",
                "valueField": "expenses"
            }],
            "categoryField": "date",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "tickLength": 0,
            },
            "export": {
                "enabled": false
            }
        });
    }

    render() {
        return (
            <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="portlet light ">
                    <div className="portlet-title">
                        <div className="caption ">
                            <span className="caption-subject font-dark bold uppercase">بودجه خرج شده کمپین</span>

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
                        <div id="budget_chart" className="CSSAnimationChart"></div>
                    </div>
                </div>
            </div>
        )
    }
}