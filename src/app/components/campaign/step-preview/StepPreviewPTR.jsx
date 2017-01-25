import React, {Component} from 'react'
import {reduxForm} from "redux-form";
import {select} from "../../../functions/select";
import {navigate} from "../../../functions/navigate";

class StepPreviewPTR extends Component {
    render() {
        let {data, created_at} = this.props;

        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> پیش نمایش : <span
                            className="campaign-title">{data.name}</span></div>
                    </div>
                    <div className="portlet-body form">
                        <form className="form-horizontal" role="form">
                            <div className="form-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نام کمپین :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.name} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نام پلان :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.plan_id} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">وضعیت تایید :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.admin_status} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">وضعیت پرداخت :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {data.pay_status == 'no' ? 'پرداخت نشده' : 'پرداخت شده'} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">تاریخ ایجاد :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {created_at(data.created_at)} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">تاریخ آخرین به‌روز رسانی :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> {created_at(data.updated_at)} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="form-section">جزئيات کمپین</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">نوع تبلیغ :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static">{select('campaignStepData.type') == 'upload' ? 'محتوای جدید' : 'انتخاب شده از کانال'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">متن :</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static">{data.promotes != null ? data.promotesText : data.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-offset-3 col-md-9">
                                                <button onClick={
                                                    () => {
                                                        navigate('/v1/campaign/create/:campaign_id:/step/plan', {
                                                            campaign_id: select('createCampaignData.id')
                                                        });
                                                    }
                                                } className="btn btn-default  button-next btn-arrow-text margin-top-40"
                                                        type="submit"><i className="fa fa-angle-right"/> مرحله قبل
                                                </button>
                                                <button onClick={
                                                    () => {
                                                        navigate('/v1/');
                                                    }
                                                } className="btn btn-primary  button-next btn-arrow-text margin-top-40"
                                                        type="submit">تایید <i className="fa fa-angle-left"/>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'StepPreviewPTR'
})(StepPreviewPTR);