import React, {Component} from 'react';
import SelectPlanPTR from './SelectPlanPTR';
import {connect} from 'react-redux';
import {store} from './../../../redux/store';
import { PersianNumber } from 'react-persian';

@connect()
export default class SelectPlanCTR extends Component {



    render() {
        let planData = store.getState().planList;
        console.log(planData);
        return (

            <div className="test">
                <SelectPlanPTR PlanList={planData}/>
            </div>
        );
    }
}
