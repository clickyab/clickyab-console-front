import React, {Component} from "react";
import $ from "jquery";
// import {translatable} from 'react-multilingual/dist';
require('jquery-sparkline/jquery.sparkline');


export default class TotalConstAdsBoxPTR extends Component {

    componentDidMount() {
        $('#total-const-bar').sparkline([13, 5], {
            type: 'pie',
            width: '70',
            barWidth: 5,
            height: '55',
            sliceColors: ['#35aa47', '#f36a5a']
        });
    }

    render() {
        return (
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12'>
                <div className='dashboard-stat2 '>
                    <div className='display'>
                        <div className='number'>
                            <h3 className='font-green-sharp'>
                                <span data-counter='counterup' data-value='7800'>20</span>

                            </h3>
                            <small>
                                تبلیغات ثابت
                            </small>
                            <br/>
                            (
                            <small style={{color: '#35aa47'}}>فعال</small>
                            /
                            <small style={{color: '#f36a5a'}}>غیرفعال</small>
                            )
                        </div>
                        <div className='pull-left'>
                            <div className='number-stats'>
                                <div className='stat-left'>
                                    <div className='stat-chart'>

                                        <div id='total-const-bar'/>

                                    </div>
                                    <div className='stat-number'/>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}