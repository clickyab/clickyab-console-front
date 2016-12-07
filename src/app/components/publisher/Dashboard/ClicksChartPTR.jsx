import React from 'react';
import AMChartSerial from '../../common/charts/AMChartSerial';

const dataProvider = [
    {
        'category': 'چهارشنبه 1 شهریور',
        'value': 13
    }, 
    {
        'category': 'چهارشنبه 2 شهریور',
        'value': 11
    }, 
    {
        'category': 'چهارشنبه 3 شهریور',
        'value': 15
    },
    {
        'category': 'چهارشنبه 4 شهریور',
        'value': 16
    },
    {
        'category': 'چهارشنبه 4 شهریور',
        'value': 16
    },
    {
        'category': 'چهارشنبه 5 شهریور',
        'value': 18
    },
    {
        'category': 'چهارشنبه 24 شهریور',
        'value': 81
    }
];


let  ClickChartPTR = () => <AMChartSerial dataProvider={dataProvider} />
export  default  ClickChartPTR;

