import React, {Component} from 'react';
import SelectPlanPTR from './SelectPlanPTR';
import {connect} from 'react-redux';
import {store} from './../../../redux/store';

@connect()
export default class SelectPlanCTR extends Component {

    componentDidMount() {
        let planData = store.getState().planList;
        function DisplayPlanList(data) {
            let $resultDisplay = $('.plan-list');
            if ($resultDisplay.find('.session-item').length > 0 ) {
                $('.plan-list').remove();
            }
            for (let key in data.items) {
                    $resultDisplay.append(
                        '<div class="col-md-3">'+
                            '<div class="price-column-container border-active">'+
                                 '<div class="price-table-head bg-blue">'+
                                      '<h2 class="no-margin">' + data.items[key].name +'</h2>'+
                                 '</div>'+
                        '<div class="arrow-down border-top-blue"/>'+
                             '<div class="price-table-pricing">'+
                                 '<h3 class="persian-number">'+
                                  '<sup class="price-sign">تومان</sup>' + data.items[key].price +'</h3>'+
                             '</div>'+
                             '<div class="price-table-content">'+
                                   '<p class="mobile-padding">' + data.items[key].description +' </p>'+
                            '</div>'+
                            '<div class="arrow-down arrow-grey"></div>'+
                                 '<div class="price-table-footer">'+
                                      '<button type="button" class="btn grey-salsa btn-outline sbold uppercase price-button">انتخاب و پرداخت</button>'+
                                 '</div>'+
                             '</div>'+
                        '</div>'
                    );
            }
        }
        DisplayPlanList(planData);

    }
    render() {
        return (<SelectPlanPTR />);
    }
}
