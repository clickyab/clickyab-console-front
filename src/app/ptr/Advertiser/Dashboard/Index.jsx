import React, {Component} from "react";
import {translatable} from "react-multilingual/dist";

@translatable(({
    DashboardTitle
})=>({
    DashboardTitle
}))

export default class AdvertiserDashboardPage extends Component {

    componentDidMount() {

        $("#sparkline_bar").sparkline([13 , 5], {
            type: 'pie',
            width: '70',
            barWidth: 5,
            height: '55',
            sliceColors: ['#35aa47','#f36a5a']
        });

        $("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
            type: 'bar',
            width: '70',
            barWidth: 5,
            height: '55',
            barColor: '#5c9bd1',
            negBarColor: '#e02222'
        });

        $("#sparkline_bar3").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
            type: 'bar',
            width: '70',
            barWidth: 5,
            height: '55',
            barColor: '#35aa47',
            negBarColor: '#e02222'
        });

        $("#sparkline_bar4").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
            type: 'bar',
            width: '70',
            barWidth: 5,
            height: '55',
            barColor: '#35aa47',
            negBarColor: '#e02222'
        });

        $("#sparkline_bar5").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
            type: 'bar',
            width: '100',
            barWidth: 5,
            height: '55',
            barColor: '#35aa47',
            negBarColor: '#e02222'
        });

        var chart = AmCharts.makeChart("dashboard_amchart_1", {
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

        var chart = AmCharts.makeChart("dashboard_amchart_3", {
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
                            <span>کمپین های من</span>
                        </li>
                    </ul>
                    <div className="page-toolbar pull-left">

                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <h1 className="page-title"> کمپین ها</h1>
                    </div>
                    <div className="top-action-header">
                        <button type="button" className="btn blue-madison pull-left">ساخت تبلیغ جدید</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat2 ">
                            <div className="display">
                                <div className="number">
                                    <h3 className="font-green-sharp">
                                        <span data-counter="counterup" data-value="7800">20</span>

                                    </h3>
                                    <small>
                                        کمپین ها
                                    </small>
                                    <br/>
                                    (<small style={{ color: '#35aa47'}}>فعال</small> / <small style={{ color: '#f36a5a'}}>غیرفعال</small>)
                                </div>
                                <div className="pull-left">
                                    <div className="number-stats">
                                        <div className="stat-left">
                                            <div className="stat-chart">

                                                <div id="sparkline_bar"></div>

                                            </div>
                                            <div className="stat-number">

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat2 ">
                            <div className="display">
                                <div className="number">
                                    <h3 className="font-red-haze">
                                        <span data-counter="counterup" data-value="1349">2500</span>
                                    </h3>
                                    <small>کلیک های معتبر</small>
                                    <br/>
                                    <small>هفته اخیر</small>
                                </div>
                                <div className="pull-left">
                                    <div className="number-stats">
                                        <div className="stat-left">
                                            <div className="stat-chart">

                                                <div id="sparkline_bar2"></div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat2 ">
                            <div className="display">
                                <div className="number">
                                    <h3 className="font-red-haze">
                                        <span data-counter="counterup" data-value="1349">9000</span>
                                    </h3>
                                    <small>نمایش تبلیغات</small>
                                    <br/>
                                    <small>هفته اخیر</small>
                                </div>
                                <div className="pull-left">
                                    <div className="number-stats">
                                        <div className="stat-left">
                                            <div className="stat-chart">

                                                <div id="sparkline_bar3"></div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat2 ">
                            <div className="display">
                                <div className="number">
                                    <h3 className="font-red-haze">
                                        <span data-counter="counterup" data-value="1349">150,000</span>
                                    </h3>
                                    <small>باقیمانده بودجه (ریال)</small>
                                    <br/>
                                    <small>هفته اخیر</small>
                                </div>
                                <div className="pull-left">
                                    <div className="number-stats">
                                        <div className="stat-left">
                                            <div className="stat-chart">

                                                <div id="sparkline_bar4"></div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
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
                                <div id="dashboard_amchart_1" className="CSSAnimationChart"></div>
                            </div>
                        </div>
                    </div>
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
                                <div id="dashboard_amchart_3" className="CSSAnimationChart"></div>
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


