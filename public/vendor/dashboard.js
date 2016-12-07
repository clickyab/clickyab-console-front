var App = require("./app");
var Dashboard = function() {

    return {

        initDashboardDaterange: function() {
            if (!$().daterangepicker) {
                return;
            }

            $('#dashboard-report-range').daterangepicker({
                "ranges": {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                    'Last 7 Days': [moment().subtract('days', 6), moment()],
                    'Last 30 Days': [moment().subtract('days', 29), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                },
                "locale": {
                    "format": "MM/DD/YYYY",
                    "separator": " - ",
                    "applyLabel": "Apply",
                    "cancelLabel": "Cancel",
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "Custom",
                    "daysOfWeek": [
                        "Su",
                        "Mo",
                        "Tu",
                        "We",
                        "Th",
                        "Fr",
                        "Sa"
                    ],
                    "monthNames": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ],
                    "firstDay": 1
                },
                //"startDate": "11/08/2015",
                //"endDate": "11/14/2015",
                opens: (App.isRTL() ? 'right' : 'left'),
            }, function(start, end, label) {
                if ($('#dashboard-report-range').attr('data-display-range') != '0') {
                    $('#dashboard-report-range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                }
            });
            if ($('#dashboard-report-range').attr('data-display-range') != '0') {
                $('#dashboard-report-range span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
            }
            $('#dashboard-report-range').show();
        },

        initSparklineCharts: function() {
            if (!jQuery().sparkline) {
                return;
            }


            $("#sparkline_bar6").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
                type: 'bar',
                width: '100',
                barWidth: 5,
                height: '55',
                barColor: '#ffb848',
                negBarColor: '#e02222'
            });

            $("#sparkline_line").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
                type: 'line',
                width: '100',
                height: '55',
                lineColor: '#ffb848'
            });
        },

        // dashboard_amchart_1
        initAmChart1: function() {
            if (typeof(AmCharts) === 'undefined' || $('#dashboard_amchart_1').length === 0) {
                return;
            }

            var chartData = [{
                "date": "2012-01-05",
                "distance": 480,
                "townName": "Miami",
                "townName2": "Miami",
                "townSize": 10,
                "latitude": 25.83,
                "duration": 501
            }, {
                "date": "2012-01-06",
                "distance": 386,
                "townName": "Tallahassee",
                "townSize": 7,
                "latitude": 30.46,
                "duration": 443
            }, {
                "date": "2012-01-07",
                "distance": 348,
                "townName": "New Orleans",
                "townSize": 10,
                "latitude": 29.94,
                "duration": 405
            }, {
                "date": "2012-01-08",
                "distance": 238,
                "townName": "Houston",
                "townName2": "Houston",
                "townSize": 16,
                "latitude": 29.76,
                "duration": 309
            }, {
                "date": "2012-01-09",
                "distance": 218,
                "townName": "Dalas",
                "townSize": 17,
                "latitude": 32.8,
                "duration": 287
            }, {
                "date": "2012-01-10",
                "distance": 349,
                "townName": "Oklahoma City",
                "townSize": 11,
                "latitude": 35.49,
                "duration": 485
            }, {
                "date": "2012-01-11",
                "distance": 603,
                "townName": "Kansas City",
                "townSize": 10,
                "latitude": 39.1,
                "duration": 890
            }, {
                "date": "2012-01-12",
                "distance": 534,
                "townName": "Denver",
                "townName2": "Denver",
                "townSize": 18,
                "latitude": 39.74,
                "duration": 810
            }, {
                "date": "2012-01-13",
                "townName": "Salt Lake City",
                "townSize": 12,
                "distance": 425,
                "duration": 670,
                "latitude": 40.75,
                "alpha": 0.4
            }, {
                "date": "2012-01-14",
                "latitude": 36.1,
                "duration": 470,
                "townName": "Las Vegas",
                "townName2": "Las Vegas",
                "bulletClass": "lastBullet"
            }, {
                "date": "2012-01-15"
            }];
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
        },


        initAmChart3: function() {
            if (typeof(AmCharts) === 'undefined' || $('#dashboard_amchart_3').length === 0) {
                return;
            }

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
        },


        init: function() {

            // this.initJQVMAP();
            // this.initCalendar();
            // this.initCharts();
            // this.initEasyPieCharts();
            // this.initSparklineCharts();
            // this.initChat();
            // this.initDashboardDaterange();
            // this.initMorisCharts();

            // this.initAmChart1();
            //
            // // this.initAmChart2();
            // this.initAmChart3();
            // this.initSparklineCharts();
            // this.initAmChart4();

            // this.initWorldMapStats();
        }
    };

}();

if (App.isAngularJsApp() === false) {
    $(document).ready(function() {
        Dashboard.init(); // init metronic core componets
    });
}
