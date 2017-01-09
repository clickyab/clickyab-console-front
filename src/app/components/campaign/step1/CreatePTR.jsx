import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";


class CreatePTR extends Component {
    createCampaignForm;

    // handleInitialize() {
    //     const initData = select("user.personal", {}, true);
    //     initData.email = getEmail();
    //     this.props.initialize(initData);
    // }

    componentDidMount() {
        // this.handleInitialize();
        this.createCampaignForm = $('.campaign-name-form');
        this.createCampaignForm.validate({
            rules: {
                name: {
                    required: true,
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

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> ثبت کمپین جدید </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20">
                            <div className="row step-background">
                                <div className="col-md-3 bg-grey-steel mt-step-col active">
                                    <div className="mt-step-number">۱</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                    <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص دهید.</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۲</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل و مدیا</div>
                                    <div className="mt-step-content font-grey-cascade">عکس، ویدیو و یا پی دی اف خود را آپلود کنید.</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۳</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">کپشن تبلیغ</div>
                                    <div className="mt-step-content font-grey-cascade">متن تبلیغ خود را تایپ کنید</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۴</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان بازدید مشخص کنید</div>
                                </div>
                            </div>
                            <br/>
                        </div>
                        <form id="theForm" className="simform campaign-name-form" autoComplete="off" method="post"
                              onSubmit={handleSubmit((values) => SubmitCreateCampaignName(values, this.createCampaignForm))}>
                            <div className="simform-inner">
                                <ol className="questions">
                                    <li className="current form-group">
                                        <span className="title-s-form"><label htmlFor="q1">۱- نام کمپین را وارد نمایید</label></span>
                                        <Field component="input" id="campaign_name" name="name" type="text"/>

                                    </li>
                                </ol>
                                <button className="btn-campaign-name submit btn dark btn-outline btn-lg margin-top-20" type="submit">مرحله بعد</button>
                                {/*<div className="controls">*/}
                                {/*<button className="next show fa fa-arrow-right" type="submit"/>*/}
                                {/*</div>*/}
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