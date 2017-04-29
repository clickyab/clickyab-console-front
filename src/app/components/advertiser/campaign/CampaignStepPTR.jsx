import React, {Component} from 'react';
import {translate} from './../../../functions/translate';

export default class CampaignStepPTR extends Component {
    render() {
        return(
            <div className={'col-md-2 mt-step-col ' + this.props.stepCondition}>
                <div className="mt-step-number bg-white">
                    {this.props.stepNumber}
                </div>
                <div className="mt-step-title uppercase font-grey-cascade">{translate(this.props.stepName)}</div>

            </div>
        )
    }
}