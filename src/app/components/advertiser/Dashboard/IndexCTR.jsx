import React from "react";
import {Link} from "react-router";
import {translate} from "../../../functions/translate";
import {securify} from "../../../functions/securify";
import {PieChart} from "./PieChart";
import {SerialChart} from "./SerialChart";
require('jquery-sparkline/jquery.sparkline');
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/pie');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');

export default function AdvertiserDashboardPage() {
        return (
            <div className='page-content'>

                <div className='row'>
                    <div className='portlet light'>
                        <div className='portlet-title'>
                            <div className='caption'>
                                <span className='caption-subject bold uppercase font-dark'>{translate('Dashboard')}</span>
                            </div>
                            <div className="actions">
                                <div className="btn-group">
                                    <Link to="/v1/advertiser/campaign/create/step/name"
                                          className="btn btn-transparent blue btn-outline btn-circle btn-sm">{translate("New Campaign")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-xs-12 col-sm-12">
                        <div className="portlet light bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="icon-share font-red-sunglo hide"/>
                                    <span className="caption-subject font-dark  uppercase">{translate("Views Report")}</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <SerialChart/>
                            </div>
                        </div>
                    </div>

                    {securify(
                        () => <div className="col-lg-6 col-xs-12 col-sm-12">
                            <div className="portlet light bordered">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="icon-share font-red-sunglo hide"/>
                                        <span className="caption-subject font-dark  uppercase">{translate("Views Per Channel")}</span>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <PieChart/>
                                </div>
                            </div>
                        </div>,
                        ({user}, {canSeeAdvertiserPieChart}, run) => run(canSeeAdvertiserPieChart())
                    )}
                </div>
            </div>
        );
}