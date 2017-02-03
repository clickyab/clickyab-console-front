import React, {Component} from "react";
import {Link} from "react-router";
import {translatable} from "react-multilingual/dist";
import {loading} from "../../../functions/loading";
import BudgetChartPTR from "./../../../components/advertiser/Dashboard/BudgetChartPTR";
import RangePickerPTR from "../../../components/common/datepicker/RangePickerPTR";
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
		$(".demo-sparkline-area").sparkline([3, 10, 70, 62, 73, 79, 76, 77, 73, 52, 57, 50, 60, 55, 70, 68], {
			type: 'line',
			width: '100%',
			height: '40',
			spotRadius: 5,
			lineWidth: 1.5,
			lineColor: 'rgba(255,255,255,.85)',
			fillColor: 'rgba(0,0,0,0.03)',
			spotColor: 'rgba(255,255,255,.5)',
			minSpotColor: 'rgba(255,255,255,.5)',
			maxSpotColor: 'rgba(255,255,255,.5)',
			highlightLineColor: '#ffffff',
			highlightSpotColor: '#ffffff',
			tooltipChartTitle: 'Usage',
			tooltipSuffix: ' %'

		});


		AmCharts.makeChart('test1', {
			'type': 'serial',
			'addClassNames': true,
			'theme': 'light',
			'fontFamily': 'IRANSans',
			'path': '../assets/global/plugins/amcharts/ammap/images/',
			'autoMargins': false,
			'marginLeft': 30,
			'marginRight': 8,
			'marginTop': 10,
			'marginBottom': 26,
			'balloon': {
				'adjustBorderColor': false,
				'horizontalPadding': 10,
				'verticalPadding': 8,
				'color': '#ffffff'
			},

			'dataProvider': [{
				'date': 'شنبه',
				'badge': 500000,
				'expenses': 400000
			}, {
				'date': 'یک شنبه',
				'badge': 400000,
				'expenses': 340000
			}, {
				'date': 'دوشنبه',
				'badge': 300000,
				'expenses': 290000
			}, {
				'date': 'سه شنبه',
				'badge': 800000,
				'expenses': 750000
			}, {
				'date': 'چهارشنبه',
				'badge': 900000,
				'expenses': 890000,
			}, {
				'date': 'پنج شنبه',
				'badge': 100000,
				'expenses': 100000,
			}, {
				'date': 'جمعه',
				'badge': 700000,
				'expenses': 690000,
				'dashLengthColumn': 5,
				'alpha': 0.2,
				'additional': '(projection)'
			}
			],
			'valueAxes': [{
				'axisAlpha': 0,
				'position': 'left',
				'labelsEnabled': false,
			}],
			'startDuration': 1,
			'graphs': [{
				'alphaField': 'alpha',
				'balloonText': '<span style="font-length:12px;">بودجه در روز   [[date]]:<br><span style="font-length:13px;">[[value]]</span></span>',
				'fillAlphas': 1,
				'title': 'بودجه',
				'type': 'column',
				'valueField': 'badge',
				'dashLengthField': 'dashLengthColumn'
			}, {
				'id': 'graph2',
				'balloonText': '<span style="font-length:12px;">[[title]] در [[date]]:<br><span style="font-length:20px;">[[value]]</span> [[additional]]</span>',
				'bullet': 'round',
				'lineThickness': 3,
				'bulletSize': 7,
				'bulletBorderAlpha': 1,
				'bulletColor': '#FFFFFF',
				'useLineColorForBulletBorder': true,
				'bulletBorderThickness': 3,
				'fillAlphas': 0,
				'lineAlpha': 1,
				'title': 'میانگین',
				'valueField': 'expenses'
			}],
			'categoryField': 'date',
			'categoryAxis': {
				'gridPosition': 'start',
				'axisAlpha': 0,
				'tickLength': 0,
			},
			'export': {
				'enabled': false
			}
		});

		AmCharts.makeChart('test2', {
			'type': 'serial',
			'addClassNames': true,
			'theme': 'light',
			'fontFamily': 'IRANSans',
			'path': '../assets/global/plugins/amcharts/ammap/images/',
			'autoMargins': false,
			'marginLeft': 30,
			'marginRight': 8,
			'marginTop': 10,
			'marginBottom': 26,
			'balloon': {
				'adjustBorderColor': false,
				'horizontalPadding': 10,
				'verticalPadding': 8,
				'color': '#ffffff'
			},

			'dataProvider': [{
				'date': 'شنبه',
				'badge': 500000,
				'expenses': 400000
			}, {
				'date': 'یک شنبه',
				'badge': 400000,
				'expenses': 340000
			}, {
				'date': 'دوشنبه',
				'badge': 300000,
				'expenses': 290000
			}, {
				'date': 'سه شنبه',
				'badge': 800000,
				'expenses': 750000
			}, {
				'date': 'چهارشنبه',
				'badge': 900000,
				'expenses': 890000,
			}, {
				'date': 'پنج شنبه',
				'badge': 100000,
				'expenses': 100000,
			}, {
				'date': 'جمعه',
				'badge': 700000,
				'expenses': 690000,
				'dashLengthColumn': 5,
				'alpha': 0.2,
				'additional': '(projection)'
			}
			],
			'valueAxes': [{
				'axisAlpha': 0,
				'position': 'left',
				'labelsEnabled': false,
			}],
			'startDuration': 1,
			'graphs': [{
				'alphaField': 'alpha',
				'balloonText': '<span style="font-length:12px;">بودجه در روز   [[date]]:<br><span style="font-length:13px;">[[value]]</span></span>',
				'fillAlphas': 1,
				'title': 'بودجه',
				'type': 'column',
				'valueField': 'badge',
				'dashLengthField': 'dashLengthColumn'
			}, {
				'id': 'graph2',
				'balloonText': '<span style="font-length:12px;">[[title]] در [[date]]:<br><span style="font-length:20px;">[[value]]</span> [[additional]]</span>',
				'bullet': 'round',
				'lineThickness': 3,
				'bulletSize': 7,
				'bulletBorderAlpha': 1,
				'bulletColor': '#FFFFFF',
				'useLineColorForBulletBorder': true,
				'bulletBorderThickness': 3,
				'fillAlphas': 0,
				'lineAlpha': 1,
				'title': 'میانگین',
				'valueField': 'expenses'
			}],
			'categoryField': 'date',
			'categoryAxis': {
				'gridPosition': 'start',
				'axisAlpha': 0,
				'tickLength': 0,
			},
			'export': {
				'enabled': false
			}
		});

		AmCharts.makeChart("test3", {
			"type": "pie",
			'fontFamily': 'IRANSans',
			"theme": "light",
			"dataProvider": [{
				"title": "کمپین های فعال",
				"value": 4852
			}, {
				"title": "کمپین های آرشیو",
				"value": 9899
			},
				{
					"title": " کمپین های منقضی شده",
					"value": 6000
				}],
			"titleField": "title",
			"valueField": "value",
			"labelRadius": 5,

			"radius": "42%",
			"innerRadius": "60%",
			"labelText": "[[title]]",
			"export": {
				"enabled": true
			}
		});
	}

	render() {
		let {DashboardTitle} = this.props;
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
					<div className='page-toolbar pull-left'>
						<RangePickerPTR/>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
						<h1 className='page-title'> کمپین ها</h1>
					</div>
					<div className='top-action-header'>
						<Link to="/v1/advertiser/campaign/create/step/name" className="btn btn-lg blue pull-left">
							<i className="fa fa-plus"/> ساخت کمپین جدید
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-5">
						<div className="row">
							<div className="col-sm-6 col-lg-6">
								<div
									className="panel panel-success panel-colorful dashboard-stat dashboard-stat-v2 blue">
									<div className="dashboard-stat2 ">
										<div className="pad-all">
											<p className="text-lg text-semibold"><i
												className="demo-pli-data-storage icon-fw fa fa-gears"/> کمپین ها</p>
											<p>
												<span className="pull-left light-weight">۳ </span>
												<span className="ultra-light-weight">کمپین های فعال</span>
											</p>
											<p>
												<span className="pull-left light-weight">۱۰ </span>
												<span className="ultra-light-weight">غیرفعال های فعال</span>
											</p>
										</div>
										<div className="pad-all text-center">
											<div className="demo-sparkline-area"/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-lg-6">
								<div
									className="panel panel-success panel-colorful dashboard-stat dashboard-stat-v2 purple">
									<div className="dashboard-stat2 ">
										<div className="pad-all">
											<p className="text-lg text-semibold"><i
												className="demo-pli-data-storage icon-fw fa fa-bullseye"/> کلیک ها</p>
											<p>
												<span className="pull-left light-weight">1568</span>
												<span className="ultra-light-weight">معتبر</span>
											</p>
											<p>
												<span className="pull-left light-weight">5000</span>
												<span className="ultra-light-weight">غیر معتبر</span>
											</p>
										</div>
										<div className="pad-all text-center">
											<div className="demo-sparkline-area"/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-6 col-lg-6">
								<div
									className="panel panel-success panel-colorful dashboard-stat dashboard-stat-v2 red">
									<div className="dashboard-stat2 ">
										<div className="pad-all">
											<p className="text-lg text-semibold"><i
												className="demo-pli-data-storage icon-fw fa fa-gears"/> تبلیغات</p>
											<p>
												<span className="pull-left light-weight">100,000 نمایش</span>
												<span className="ultra-light-weight"> آمار  </span>
											</p>
										</div>
										<div className="pad-all text-center">
											<div className="demo-sparkline-area"/>
										</div>
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-lg-6">
								<div
									className="panel panel-success panel-colorful dashboard-stat dashboard-stat-v2 green">
									<div className="dashboard-stat2 ">
										<div className="pad-all">
											<p className="text-lg text-semibold"><i
												className="demo-pli-data-storage icon-fw fa fa-gears"/> بوجه </p>
											<p>
												<span className="pull-left light-weight">1000,000</span>
												<span className="ultra-light-weight">  خرج شده </span>
											</p>
											<p>
												<span className="pull-left light-weight">200,000</span>
												<span className="ultra-light-weight"> باقیمانده  </span>
											</p>
										</div>
										<div className="pad-all text-center">
											<div className="demo-sparkline-area"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-7 col-xs-12 col-sm-12">

						<BudgetChartPTR/>
					</div>

				</div>
				<div className="row">
					<div className="col-lg-4 col-xs-12 col-sm-12">

						<div className='portlet light '>
							<div className='portlet-title'>
								<div className='caption'>
									<span
										className='caption-subject bold uppercase font-dark'>کلیک های انجام شده کمپین </span>
								</div>
							</div>
							<div className='portlet-body'>
								<div id='test1' style={{height: "200px"}} className='CSSAnimationChart'/>
							</div>
						</div>
					</div>

					<div className="col-lg-4 col-xs-12 col-sm-12">

						<div className='portlet light '>
							<div className='portlet-title'>
								<div className='caption'>
									<span
										className='caption-subject bold uppercase font-dark'>کلیک های انجام شده کمپین </span>
								</div>
							</div>
							<div className='portlet-body'>
								<div id='test2' style={{height: "200px"}} className='CSSAnimationChart'/>
							</div>
						</div>
					</div>

					<div className="col-lg-4 col-xs-12 col-sm-12">

						<div className='portlet light '>
							<div className='portlet-title'>
								<div className='caption'>
									<span
										className='caption-subject bold uppercase font-dark'>کلیک های انجام شده کمپین </span>
								</div>
							</div>
							<div className='portlet-body'>
								<div id='test3' style={{height: "200px"}} className='CSSAnimationChart'/>
							</div>
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


