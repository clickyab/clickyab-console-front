import React, {Component} from "react";
import $ from "jquery";
// import {translatable} from 'react-multilingual/dist';
import moment from "moment-jalali";
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
                format: 'dddd، D MMMM YYYY',
                "customRangeLabel": "زمان دلخواه",
            },
            startDate: start,
            endDate: end,
            autoApply: true,
            ranges: {
                'امروز': [moment(), moment()],
                'دیروز': [moment().subtract('day', 1), moment()],
                'هفته گذشته': [moment().subtract('day', 7), moment()],
                'دو هفته گذشته': [moment().subtract('day', 14), moment()],
                'یک ماه گذشته': [moment().subtract('day', 30), moment()],
                'این ماه': [moment().startOf('jMonth'), moment().endOf('jMonth')],
                'آخرین ماه': [moment().subtract('jMonth', 1).startOf('jMonth'), moment().subtract('jMonth', 1).endOf('jMonth')]
            },
            showCustomRangeLabel: false,
            alwaysShowCalendars: false,
        }, cb);
        cb(start, end);
    }

    render() {
        return (
            <div id='dashboard-report-range' className='pull-right btn btn-sm' data-container='body'
                 data-placement='bottom' data-original-title='Change dashboard date range'>
                <i className='icon-calendar'/>&nbsp;
                <span className='thin uppercase hidden-xs'/>&nbsp;
                <i className='fa fa-angle-down'/>
            </div>
        )
    }
}