import React from 'react';
import AMChartBar from './../../common/AMChartBar';

const dataProvider = [{
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
},{
    'date': 'پنج شنبه',
    'badge': 100000,
    'expenses': 100000,
},{
    'date': 'جمعه',
    'badge': 700000,
    'expenses': 690000,
    'dashLengthColumn': 5,
    'alpha': 0.2,
    'additional': '(projection)'
}
];


let  BudgetChartPTR = (props) => <AMChartBar {...props} dataProvider={dataProvider} />;

export  default  BudgetChartPTR;