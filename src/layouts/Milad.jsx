import React, {Component} from "react";
import {translatable} from "react-multilingual/dist";
import MetronicComponent from "../app/components/MetronicComponent";
const ReactHighcharts = require('react-highcharts');


@translatable(({
	AppStaticTitle
}) => ({
	AppStaticTitle
}))


export class Campaigns extends MetronicComponent {
//     var yaxis = 20;
//     var direction='rtl';
//     var align='right';
//     var weight='normal';
//     var config = {
//     chart: {
//         polar: true,
//         style: {
//             fontFamily: 'IRANSans,sans-serif'
//         },
//     },
//
//     colors: ['#699FFB', '#FD8E25', '#5FA461', '#D60915', '#aaeeee', '#ff0066', '#eeaaee',
//         '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
//     type: 'spline',
//     title: {
//         text: 'milad'
//
//     },
//     xAxis: {
//
//         labels: {
//             enabled: true,//default is true
//             useHTML: true,
//             y: yaxis, rotation: -45, align: align
//         },
//         categories: ['27 مرداد','28 مرداد','29 مرداد','30 مرداد','31 مرداد','1 شهریور','2 شهریور','3 شهریور','4 شهریور','5 شهریور','6 شهریور','7 شهریور','8 شهریور','9 شهریور']
//     },
//     yAxis: {
//         visible:false,
//         title: {
//             text: ''
//         },
//         allowDecimals: true,
//         labels: {
//             style: { 'fontSize': '13px', 'fontWeight': weight, 'color': '#60606a','fontFamily': 'lato', },
//             useHTML: true,
//             formatter: function () {
//                 return milad.numberFormat(this.value,0,'.',',');
//             }
//         }
//     },
//     tooltip: {
//         shared: true,
//         crosshairs: true,
//         useHTML: true,
//         valueDecimals: 1,
//         style: {
//             padding: 10,
//             align: align
//         },
//         formatter: function () {
//             var s = '<b style="text-transform:capitalize;font-weight:'+ weight+';display:block;text-align:' +align + ';direction: ' + direction +'">' + this.x + '</b>';
//             var n = [];
//             var i = 0;
//             $.each(this.points, function (i, point) {
//                 n[i++] = point.y;
//                 if (point.series.name == 'CTR') {
//                     s += '<span style="text-transform:capitalize;font-weight:'+ weight+';display:block;text-align: ' +align +'"> <span style="color:' + point.series.color + '">●</span>' + point.series.name + ' : ' + this.point.y + '</span>';
//                 }
//                 else {
//                     s += '<span style="text-transform:capitalize;font-weight:'+ weight+';display:block;text-align:' +align +'"><span style="color:' + point.series.color + '">●</span>' + point.series.name + ' : ' + this.point.y + '</span>';
//                 }
//             });
//             return s;
//         },
//     },
//     plotOptions: {
//         area: {
//             stacking: 'normal',
//             lineColor: '#666666',
//             lineWidth: 1,
//             marker: {
//                 enabled: false,
//                 symbol: 'circle',
//                 radius: 3,
//                 states: {
//                     hover: {
//                         enabled: true
//                     }
//                 }
//             }
//         }
//     },
//     plotOptions: {
//         series: {
//             cursor: 'pointer',
//             point: {
//                 events: {}
//             },
//             marker: {
//                 lineWidth: 1
//             }
//         }
//     },
//     series: [{
//         name: 'نمایش',
//         data: [22855927,20621338,20543239,24022363,25227341,25331297,24462327,24443974,22124421,21349827,25873078,24230469,21923875,4511249]
//     }, {
//         name: 'کلیک',
//         data: [46429621,42175820,41652173,47740492,46426065,43501478,43843606,47162793,38840184,39883292,46624864,52288148,55649161,13527089]
//     }, {
//         name: 'ضرر',
//         data: [46429621,42175820,41652173,47740492,46426065,43501478,43843606,47162793,38840184,39883292,46624864,52288148,55649161,13527089]
//     }, {
//         name: 'CTR',
//         data: [0.12,0.12,0.13,0.13,0.12,0.11,0.12,0.13,0.12,0.14,0.12,0.13,0.15,0.17]
//     }]
// };

	_componentWillMount() {
		console.log("milad.jsx");
	}

	render() {
		let {AppStaticTitle} = this.props;
		return (
			<div className="page-content">
				<div className="page-bar"/>
				<h1 className="page-title">{AppStaticTitle}</h1>

			</div>
		);
	}
}

Campaigns.propTypes = {
	AppStaticTitle: React.PropTypes.string,
};

export default Campaigns;



