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
        this.createCampaignForm = $('.personal-form');
        this.createCampaignForm.validate({
            rules: {
                first_name: {
                    required: true,
                },
                last_name: {
                    required: true,
                },
                gender: {
                    required: true
                }

            },
            messages: {
                first_name: {
                    required: 'لطفا نام خود را وارد نمایید',
                },
                last_name: {
                    required: 'لطفا نام خانوادگی را وارد نمایید',
                },
                gender: {
                    required: 'لطفا جنسیت خود را وارد نمایید',
                },

            }
        });
    }


    render() {
        const {handleSubmit, submitCampaignName} = this.props;
        return (
            <div className="page-content">
                <div className="portlet box blue margin-top-20">
                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-gift"/> ثبت کمپین جدید </div>
                    </div>
                    <div className="portlet-body form">
                        <form id="theForm" className="simform" autoComplete="off" method="post"
                              onSubmit={handleSubmit((values) => submitCampaignName(values, this.createCampaignForm))}>
                            <div className="simform-inner">
                                <ol className="questions">
                                    <li className="current">
                                        <span><label htmlFor="q1">نام کمپین را وارد نمایید</label></span>
                                        <input id="q1" name="q1" type="text"/>
                                    </li>
                                </ol>
                                <button className="submit btn dark btn-outline btn-lg margin-top-20" type="submit">ثبت کمپین</button>
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