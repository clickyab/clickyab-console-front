import React, {Component} from "react";
import {Link} from "react-router";
import {translatable} from "react-multilingual/dist";
import {loading} from "../../../functions/loading";
require('jquery-sparkline/jquery.sparkline');
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/pie');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');

@translatable(({
    DashboardTitle
}) => ({
    DashboardTitle
}))
export default class AdvertiserDashboardPage extends Component {
    componentDidMount() {
        loading(false);

        AmCharts.makeChart("test3", {
            "type": "pie",
            'fontFamily': 'IRANSans',
            "theme": "light",
            //TODO: import data from select('advertiserPieChart');
            "dataProvider": [{
                "name": "کمپین های فعال",
                "view": 1
            },
            {
                "name": "کمپین های آرشیو",
                "view": 2
            },
            {
                "name": " کمپین های منقضی شده",
                "view": 3
            }],
            "titleField": "name",
            "valueField": "view",
            "startEffect": "elastic",
            "outlineAlpha": 0.4,
            "labelRadius": 15,

            "radius": "42%",
            "depth3D": 10,
            "innerRadius": "50%",
            "labelText": "[[name]]",
            "angle": 15,
            "export": {
                "enabled": true
            }
        });
    }

    render() {
        return (
            <div className='page-content'>

                <div className='page-bar'>
                    <ul className='page-breadcrumb pull-right'>
                        <li>
                            <a href='index.html'>داشبورد</a>
                            <i className='fa fa-circle'/>
                        </li>
                        <li>
                            <span>کمپین های من</span>
                        </li>
                    </ul>
                </div>
                <div className='row'>
                    <div className='portlet light bordered'>
                        <div className='portlet-title'>
                            <div className='caption'>
                                <span className='caption-subject bold uppercase font-dark'>کمپین ها</span>
                            </div>
                            <div className="actions">
                                <div className="btn-group">
                                    <Link to="/v1/advertiser/campaign/create/step/name"
                                          className="btn btn-transparent blue btn-outline btn-circle btn-sm">
                                        <i className="fa fa-plus"/> ساخت کمپین جدید
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='portlet-body'>
                            <div id='test3' className='CSSAnimationChart'/>
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


