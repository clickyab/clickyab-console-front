import React, {Component} from 'react';
// import {translatable} from 'react-multilingual/dist';

export default class AMChartSerial extends Component {


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