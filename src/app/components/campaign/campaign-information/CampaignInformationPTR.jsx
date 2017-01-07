import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import UploadFileCTR from './UploadFileCTR';



export default class CampaignInformationPTR extends Component {
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
            <h1>ویرایش کمپین ۷ آذر بامیلو</h1>
                    <div className="portlet box blue">
                        <div className="portlet-title">
                            <div className="caption">
                                <i className="fa fa-bullseye"/> ویرایش کمپین  </div>
                        </div>
                        <div className="portlet-body">
                            <div className="tabbable-custom nav-justified">
                                <ul className="nav nav-tabs nav-justified">
                                    <li className="active">
                                        <a href="#tab_1_1_1" data-toggle="tab"> آپلود عکس و ویدیو </a>
                                    </li>
                                    <li>
                                        <a href="#tab_1_1_2" data-toggle="tab"> ویرایش کپشن و متن </a>
                                    </li>
                                    <li>
                                        <a href="#tab_1_1_3" data-toggle="tab"> انتخاب پلن تبلیغاتی </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tab_1_1_1">
                                        <UploadFileCTR/>
                                    </div>
                                    <div className="tab-pane" id="tab_1_1_2">
                                        <p> Howdy, I'm in Section 2. </p>
                                        <p> Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                                            consequat. Ut wisi enim ad minim veniam, quis nostrud exerci tation. </p>
                                        <p>
                                            <a className="btn green" href="ui_tabs_accordions_navs.html#tab_1_1_2" target="_blank"> Activate this tab via URL </a>
                                        </p>
                                    </div>
                                    <div className="tab-pane" id="tab_1_1_3">
                                        <p> Howdy, I'm in Section 3. </p>
                                        <p> Duis autem vel eum iriure dolor in hendrerit in vulputate. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
                                            eum iriure dolor in hendrerit in vulputate velit esse molestie consequat </p>
                                        <p>
                                            <a className="btn yellow" href="ui_tabs_accordions_navs.html#tab_1_1_3" target="_blank"> Activate this tab via URL </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}
