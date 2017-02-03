import React, {Component} from "react";
// import {translatable} from 'react-multilingual/dist';
require('amcharts3/amcharts/amcharts');
require('amcharts3/amcharts/serial');
require('amcharts3/amcharts/themes/light');
require('amcharts3/amcharts/themes/patterns');
require('amcharts3/amcharts/themes/chalk');


export default class AMChartBar extends Component {

	componentDidMount() {
		AmCharts.makeChart('budget_chart', {
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

			'dataProvider': this.props.dataProvider,
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
	}

	render() {
		return (
			<div className='portlet light '>
				<div className='portlet-title'>
					<div className='caption '>
						<span className='caption-subject font-dark bold uppercase'>بودجه خرج شده کمپین</span>

					</div>
					<div className='actions'>
						<div className='btn-group btn-group-devided' data-toggle='buttons'>
							<label
								className='btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm active'>
								<input type='radio' name='options' className='toggle' id='option1' value='on'/>
								روزانه
							</label>
							<label
								className='btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm'>
								<input type='radio' name='options' className='toggle' id='option2' value='on'/>
								هفتگی
							</label>
							<label
								className='btn btn-transparent blue-oleo btn-no-border btn-outline btn-circle btn-sm'>
								<input type='radio' name='options' className='toggle' id='option2' value='on'/>
								ماهانه
							</label>
						</div>
					</div>
				</div>
				<div className='portlet-body'>
					<div id='budget_chart' style={{height: "360px"}} className='CSSAnimationChart'/>
				</div>
			</div>
		)
	}
}