import React, {Component} from "react";
import CampaignStepPTR from "./../CampaignStepPTR";
import $ from "jquery";
import {change, Field, reduxForm} from "redux-form";
import {dispatch} from "./../../../../functions/dispatch";
import {select} from "../../../../functions/select";
import {translate} from "./../../../../functions/translate";
import {campaignStepName} from "../../../../redux/actions/index";

class CreatePTR extends Component {
    createCampaignForm;
    firstStep = select('createCampaignData.name') ? 'done' : 'error';
    stepRow = [{
        stepCondition: 'first ' + this.firstStep,
        stepNumber: '۱',
        stepName: 'Campaign Name'
    }, {
        stepCondition: '',
        stepNumber: '۲',
        stepName: 'File Upload'
    }, {
        stepCondition: '',
        stepNumber: '۳',
        stepName: 'Text Content'
    }, {
        stepCondition: '',
        stepNumber: '۴',
        stepName: 'Campaign Type'
    }, {
        stepCondition: 'last',
        stepNumber: '۵',
        stepName: 'Finish and Payment'
    }];

    componentDidMount() {
        document.title = "ساختن کمپین جدید | انتخاب نام";
        dispatch(change('CreatePTRForm', 'name', select('createCampaignData.name', '')));

        this.createCampaignForm = $('.campaign-name-form');
        this.createCampaignForm.validate({
            rules: {
                name: {
                    required: false,
                },
            },
            messages: {
                name: {
                    required: 'لطفا نام کمپین را وارد نمایید',
                },
            }
        });
    }

    stepRowCreator() {
        let result = [];
        for (let i = 0; i < this.stepRow.length; i++) {
            result.push(<CampaignStepPTR key={'row-' + i} stepCondition={this.stepRow[i].stepCondition}
                                         stepNumber={this.stepRow[i].stepNumber}
                                         stepName={this.stepRow[i].stepName}/>)
        }
        return result;
    }


    render() {
        const {handleSubmit, SubmitCreateCampaignName} = this.props;

        return (
            <div className="page-content">

                <div className="portlet light bordered margin-top-20">

                    <div className="portlet-title">
                        <div className="caption font-blue bold">
                            <i className="fa fa-bullseye font-blue"/> {translate('Create New Campaign')}
                        </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step">
                            <div className="row step-line">
                                {this.stepRowCreator()}
                            </div>
                        </div>

                        <form id="theForm" className="simform campaign-name-form" autoComplete="off" method="post"
                              onSubmit={handleSubmit((values) => SubmitCreateCampaignName(values, this.createCampaignForm))}>
                            <div className="simform-inner">
                                <ol className="questions">
                                    <li className="current form-group">
										<span className="title-s-form"><label
                                            htmlFor="q1">۱- {translate('Please enter the campaign name')}</label></span>
                                        <Field autoFocus onFocus={() => {
                                        }} component="input" id="campaign_name" name="name" type="text"/>

                                    </li>
                                </ol>
                                <button className="btn-campaign-name submit btn btn-info  button-next btn-arrow-text"
                                       type="submit">{translate('Next Step')} <i className="fa fa-angle-left"/>
                                </button>

                            </div>
                            <span className="final-message"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'CreatePTRForm'
})(CreatePTR);