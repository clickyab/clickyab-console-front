import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm, change} from "redux-form";
import {dispatch} from "./../../../../functions/dispatch";
import {select} from "../../../../functions/select";

class CreatePTR extends Component {
    createCampaignForm;

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

    render() {
        const {handleSubmit, SubmitCreateCampaignName} = this.props;
        return (
            <div className="page-content">

                <div className="portlet light bordered margin-top-20">

                    <div className="portlet-title">
                        <div className="caption font-blue bold">
                            <i className="fa fa-bullseye font-blue"/> ثبت کمپین جدید
                        </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step">
                            <div className="row step-line">
                                <div className="col-md-2 mt-step-col first error">
                                    <div className="mt-step-number bg-white">
                                        ۱
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>

                                </div>
                                <div className="col-md-2 mt-step-col">
                                    <div className="mt-step-number bg-white">
                                        ۲
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۳
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل</div>

                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۴
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">محتوای متنی</div>

                                </div>
                                <div className="col-md-2 mt-step-col ">
                                    <div className="mt-step-number bg-white">
                                        ۵
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>

                                </div>

                                <div className="col-md-2 mt-step-col last">
                                    <div className="mt-step-number bg-white">
                                        ۶
                                    </div>
                                    <div className="mt-step-title uppercase font-grey-cascade">تایید نهایی و پرداخت
                                    </div>

                                </div>
                            </div>
                            <br/>
                            <br/>

                        </div>

                        <form id="theForm" className="simform campaign-name-form" autoComplete="off" method="post"
                              onSubmit={handleSubmit((values) => SubmitCreateCampaignName(values, this.createCampaignForm))}>
                            <div className="simform-inner">
                                <ol className="questions">
                                    <li className="current form-group">
										<span className="title-s-form"><label
                                            htmlFor="q1">۱- نام کمپین را وارد نمایید</label></span>
                                        <Field autoFocus onFocus={() => {
                                        }}  component="input" id="campaign_name" name="name" type="text"/>

                                    </li>
                                </ol>
                                <button className="btn-campaign-name submit btn btn-info  button-next btn-arrow-text"
                                        type="submit">مرحله بعد <i className="fa fa-angle-left"/></button>

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