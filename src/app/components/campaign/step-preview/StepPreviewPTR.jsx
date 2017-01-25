import React, {Component} from 'react'
import {reduxForm} from "redux-form";

class StepPreviewPTR extends Component {
    render() {
        let {data, created_at} = this.props;
        let detail;
        if(data.promotes != null) {
            detail = data.promotes;
        } else {
            detail = data;
        }
        console.log(data, detail);
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> پیش نمایش : <span className="campaign-title">{data.name}</span> </div>
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
                                                <p className="form-control-static"> {data.pay_status == 'no'? 'پرداخت نشده' : 'پرداخت شده'} </p>
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
                                            <label className="control-label col-md-3">Address:</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> #24 Sun Park Avenue, Rolton Str </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">City:</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> New York </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">State:</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> New York </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">Post Code:</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> 457890 </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label col-md-3">Country:</label>
                                            <div className="col-md-9">
                                                <p className="form-control-static"> USA </p>
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
                                                <button type="submit" className="btn green">
                                                    <i className="fa fa-pencil" /> Edit
                                                </button>
                                                <button type="button" className="btn default">Cancel</button>
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