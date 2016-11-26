import React, {Component} from 'react';
import {$} from 'jquery';
// import {translatable} from 'react-multilingual/dist';
require('jquery-sparkline/jquery.sparkline');


export default class TotalAdsBoxPTR extends Component {

    componentDidMount() {
        $('#total-ads-bar').sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11, 11], {
            type: 'bar',
            width: '70',
            barWidth: 5,
            height: '55',
            barColor: '#5c9bd1',
            negBarColor: '#e02222'
        });
    }

    render() {
        return (
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12'>
                <div className='dashboard-stat2 '>
                    <div className='display'>
                        <div className='number'>
                            <h3 className='font-red-haze'>
                                <span data-counter='counterup' data-value='1349'>2500</span>
                            </h3>
                            <small>تبلیغات نمایشی</small>
                            <br/>
                            <small>هفته اخیر</small>
                        </div>
                        <div className='pull-left'>
                            <div className='number-stats'>
                                <div className='stat-left'>
                                    <div className='stat-chart'>

                                        <div id='total-ads-bar'/>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}