import React, {PropTypes} from "react";
import {translate} from "./../../../functions/translate";

export default function CampaignStepPTR({stepNumber, stepCondition, stepName}) {
    return (
        <div className={'col-md-2 mt-step-col ' + stepCondition}>
            <div className="mt-step-number bg-white">
                {stepNumber}
            </div>
            <div className="mt-step-title uppercase font-grey-cascade">{translate(stepName)}</div>
        </div>
    )
}

CampaignStepPTR.propTypes = {
    stepCondition: PropTypes.string,
    stepNumber: PropTypes.string
};