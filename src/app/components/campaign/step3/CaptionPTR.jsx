import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
// let emojioneArea = require("emojionearea/js/emojionearea");


class CaptionPTR extends Component {
    captionCamapignForm;

    // handleInitialize() {
    //     const initData = select("user.personal", {}, true);
    //     initData.email = getEmail();
    //     this.props.initialize(initData);
    // }

    componentDidMount() {
        // this.handleInitialize();
        $(".toolgram-editor-textarea").emojioneArea({
            autoHideFilters: false,
            dir: "rtl",
            hasBia: true,
            length: 4000,
            forUpdate: true,
            pickerPosition: "top",
            filtersPosition: "bottom",
            tones: false,
            autocomplete: false,
            inline: true,
            hidePickerOnBlur: false
        });
        this.captionCamapignForm = $('.caption-campaign-form');
        this.captionCamapignForm.validate({
            rules: {
                campaign_name: {
                    required: true,
                },
            },
            messages: {
                campaign_name: {
                    required: 'لطفا نام کمپین را وارد نمایید',
                },
            }
        });
    }


    render() {
        const {handleSubmit, submitCampaignName} = this.props;
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> کپشن تبلیغ <span className="campaign-title">فلانی</span> </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20">
                            <div className="row step-background">
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۱</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                    <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص دهید.</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۲</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">آپلود فایل و مدیا</div>
                                    <div className="mt-step-content font-grey-cascade">عکس، ویدیو و یا پی دی اف خود را آپلود کنید.</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col active">
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
                        <label htmlFor="Text">متن پست</label>
                        <div className="toolgram-editor">
                            <div className="top-button-container row">
                                <button type="button" className="topButton btn btn-default toolgram-editor-btnBold" data-keys="keys">
                                    <i className="fa fa-bold"/>
                                </button>
                                <button type="button" className="topButton btn btn-default toolgram-editor-btnItalic" data-keys="keys">
                                    <i className="fa fa-italic"/>
                                </button>
                                <button type="button" className="topButton btn btn-default toolgram-editor-btnLink" data-keys="keys">
                                    <i className="fa fa-chain"/>
                                </button>
                                <button type="button" className="topButton btn btn-default toolgram-editor-btnUnLink" data-keys="keys">
                                    <i className="fa fa-chain-broken"/>
                                </button>
                                <span className="pull-left">
        <span>حروف باقیمانده:</span>
        <span className="toolgram-editor-remaining"/>
        <input className="toolgram-editor-hidden-remaining" type="hidden" name="toolgram-editor-hidden-remaining" />
    </span>
                            </div>
                            <div id="toolgram-editor-container" className="toolgram-editor-container"></div>
                            <div className="toolgram-editor-result">
                            <textarea className="toolgram-editor-content toolgram-editor-textarea" cols="20" data-val="true" data-val-maxallowedlength="طول متن نباید از ۴۰۰۰ کاراکتر بیشتر باشد." data-val-maxallowedlength-maxallowedlength="4000" data-val-required="متن پست را وارد کنید" id="Text" name="Text" rows="2">
</textarea>
                            </div>
                        </div>
                        <span className="field-validation-valid error small" data-valmsg-for="Text" data-valmsg-replace="true"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({
    form: 'CaptionPTRForm'
})(CaptionPTR);