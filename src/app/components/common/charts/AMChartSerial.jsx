import React, {Component} from 'react';
// import {translatable} from 'react-multilingual/dist';
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');


export default class AMChartSerial extends Component {

    componentDidMount() {
        AmCharts.makeChart('clicks-chart', {
            'type': 'serial',
            'theme': 'light',
            'marginRight': 40,
            'marginLeft': 40,
            'fontFamily': 'IRANSans',
            'autoMarginOffset': 20,
            'mouseWheelZoomEnabled':false,
            'dataDateFormat': 'YYYY-MM-DD',
            'valueAxes': [{
                'labelsEnabled':false,
                'id': 'v1',
                'axisAlpha': 0,
                'labelRotation':10
            }],
            'balloon': {
                'borderThickness': 1,
                'shadowAlpha': 0
            },
            'graphs': [{
                'id': 'g1',
                'balloon':{
                    'drop':true,
                    'adjustBorderColor':false,
                    'color':'#ffffff'
                },
                'bullet': 'round',
                'bulletBorderAlpha': 1,
                'bulletColor': '#FFFFFF',
                'bulletSize': 5,
                'hideBulletsCount': 50,
                'lineThickness': 2,
                'title': 'red line',
                'useLineColorForBulletBorder': true,
                'valueField': 'value',
                'fontSize':'12px',
                'balloonText': '<span style="font-size:13px;">[[category]] <br/> [[value]] کلیک</span>'
            }],
            'chartCursor': {
                'pan': true,
                'valueLineEnabled': false,
                'valueLineBalloonEnabled': false,
                'cursorAlpha':1,
                'cursorColor':'#258cbb',
                'limitToGraph':'g1',
                'valueLineAlpha':0.2,
                'valueZoomable':true
            },
            'categoryField': 'category',
            'categoryAxis': {
                'gridPosition': 'start',
                'dashLength': 1,
                'minorGridEnabled': true,
                'labelsEnabled':false,

            },
            'export': {
                'enabled': false
            },
            'dataProvider': this.props.dataProvider
        });
    }

    render() {
        return (
            <div className='col-lg-6 col-xs-12 col-sm-12'>
                <div className='portlet light '>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'>کلیک های انجام شده کمپین </span>
                        </div>
                        <div className='actions'>
                            <div className='btn-group btn-group-devided' data-toggle='buttons'>
                                <label className='btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm active'>
                                    <input type='radio' name='options' className='toggle' id='option1' value='on'/>
                                    روزانه
                                </label>
                                <label className='btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm'>
                                    <input type='radio' name='options' className='toggle' id='option2' value='on'/>
                                    هفتگی
                                </label>
                                <label className='btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm'>
                                    <input type='radio' name='options' className='toggle' id='option2' value='on'/>
                                    ماهانه
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='portlet-body'>
                        <div id='clicks-chart' className='CSSAnimationChart'/>
                    </div>
                </div>
            </div>
        )
    }
}