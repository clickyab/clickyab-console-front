import React, {Component} from 'react';
let $ = require('jquery');
// import {translatable} from 'react-multilingual/dist';
import moment from 'moment-jalali';
var daterangepicker = require('daterangepicker');

moment.loadPersian();
export default class RangePickerPTR extends Component {

    componentDidMount() {
        var start = moment().subtract(14, 'days');
        var end = moment();
        function cb(start, end) {
            $('#dashboard-report-range span').html(moment(start).format('dddd، jD jMMMM jYYYY') + ' - ' + moment(end).format('dddd، jD jMMMM jYYYY'));
        }

        $('#dashboard-report-range').daterangepicker({
            locale: {
                format: 'dddd، D MMMM YYYY'
            },
            startDate: start,
            endDate: end,
            autoApply: true,
            ranges: {
                'امروز': [moment(), moment()],
                'دیروز': [moment().subtract(1, 'day')  , moment()],
                'هفته گذشته': [moment().subtract(7, 'day'), moment()],
                'دو هفته گذشته': [moment().subtract(14, 'day'), moment()],
                'یک ماه گذشته': [moment().subtract(30, 'day'), moment()],
                'این ماه': [moment().startOf('jMonth'), moment().endOf('jMonth')],
                'آخرین ماه': [moment().subtract(1, 'jMonth').startOf('jMonth'), moment().subtract(1, 'jMonth').endOf('jMonth')]
            },
            showCustomRangeLabel: false,
            alwaysShowCalendars: false,
        }, cb);
        cb(start, end);
    }

    render() {
        return (
            <div id='dashboard-report-range' className='pull-right btn btn-sm' data-container='body' data-placement='bottom' data-original-title='Change dashboard date range'>
                <i className='icon-calendar'/>&nbsp;
                <span className='thin uppercase hidden-xs'/>&nbsp;
                <i className='fa fa-angle-down'/>
            </div>
        )
    }
}