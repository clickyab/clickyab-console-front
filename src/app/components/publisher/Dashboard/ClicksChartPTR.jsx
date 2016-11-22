import AMChartSerial from './../../common/AMChartSerial';

const dataProvider = "dataProvider": [
    {
        "category": "چهارشنبه 1 شهریور",
        "value": 13
    }, 
    {
        "category": "چهارشنبه 2 شهریور",
        "value": 11
    }, 
    {
        "category": "چهارشنبه 3 شهریور",
        "value": 15
    },
    {
        "category": "چهارشنبه 4 شهریور",
        "value": 16
    },

    {
        "category": "چهارشنبه 4 شهریور",
        "value": 16
    },
    {
        "category": "چهارشنبه 5 شهریور",
        "value": 18
    },

    {
        "category": "چهارشنبه 24 شهریور",
        "value": 81
    }
];


export default const ClickChartPTR = <AMChartSerial dataProvider={dataProvider} />