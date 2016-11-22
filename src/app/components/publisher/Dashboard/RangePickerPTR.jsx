import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';
import moment from 'moment-jalali';
var daterangepicker = require('daterangepicker');

moment.loadPersian();
export default class RangePickerPTR extends Component {

    componentDidMount() {
        var start = moment().subtract(14, 'days');
        var end = moment();
        function cb(start, end) {
            console.log(start, end)
            $('#dashboard-report-range span').html(moment(start).format('dddd، jD jMMMM jYYYY') + ' - ' + moment(end).format('dddd، jD jMMMM jYYYY'));
        }

        $('#dashboard-report-range').daterangepicker({
            locale: {
                format: 'dddd، D MMMM YYYY'
            },
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'day')  , moment()],
                'Last 7 Days': [moment().subtract(7, 'day'), moment()],
                'Last 14 Days': [moment().subtract(14, 'day'), moment()],
                'Last 30 Days': [moment().subtract(30, 'day'), moment()],
                'This Month': [moment().startOf('jMonth'), moment().endOf('jMonth')],
                'Last Month': [moment().subtract(1, 'jMonth').startOf('jMonth'), moment().subtract(1, 'jMonth').endOf('jMonth')]
            }
        }, cb);

        cb(start, end);
    }

    render() {
        return (
            <div id="dashboard-report-range" className="pull-right btn btn-sm" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range">
                <i className="icon-calendar"/>&nbsp;
                <span className="thin uppercase hidden-xs"/>&nbsp;
                <i className="fa fa-angle-down"/>
            </div>
        )
    }
}