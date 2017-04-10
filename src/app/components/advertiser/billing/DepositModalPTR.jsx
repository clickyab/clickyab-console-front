import React, {Component} from "react";
import {change, Field, reduxForm} from "redux-form";
import $ from "jquery";
import {shallowEqual} from "./../../../3rd/shallowEqual";
import {dispatch} from "../../../functions/dispatch";

class DepositModalPTR extends Component {

    initialize = false;
    DepositForm;
    state = {
        validation: true,
        profit: {
            amount: 0
        }
    };

    shouldComponentUpdate(nextProps) {
        if (!shallowEqual(this.props, nextProps) && !this.initialize) {
            this.initialize = true;
            for (let key in nextProps.depositData) {
                dispatch(change("DepositModalPTRForm", key, nextProps.depositData[key]))
            }
            return true;
        }
        return false;
    }



    componentDidMount() {
        this.DepositForm = $("#DepositModalForm");
        this.DepositForm.validate({
            rules: {
                amount: {
                    required: true,
                    // digits: true,
                    // range: [50000, 999999999999999999], //TODO: less than 50t error
                }
            },
            messages: {
                amount: {
                    required: 'لطفا مبلغ را وارد نمایید',
                    // digits: 'عدد باشد',
                    // range: 'حداقل مبلغ برداشت 50 هزار تومان می‌باشد'
                }
            }
        });
    }

    closeModal(e) {
        $(e.target).parents('.modal').prop('id').modal('hide');
    }

    render() {
        const {handleSubmit, SubmitDepositForm} = this.props;
        return (
            <div className="deposit-modal modal fade fullscreen" id="DepositModal" tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="padding-tb-15">
                                <img className="closebt" src="/img/closebtn.svg" data-dismiss="modal"
                                     aria-hidden="true"/>
                            </div>
                        </div>
                        <div className="modal-body text-center">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="modal-title text-center">
                                    <h3/>
                                </div>
                                <form role="form" action="" id="DepositModalForm" method="post"
                                      className="with-draw-form white"
                                      onSubmit={handleSubmit((values) => SubmitDepositForm(values, this.DepositForm))}>

                                    <div className="form-group">
                                        <label className="col-md-3 control-label">وضعیت</label>
                                        <div className="col-md-9">
                                            <div className="mt-radio-inline">
                                                <label className="mt-radio">
                                                    <Field name="deposit" component="input" type="radio" value="yes"/>بله
                                                        <span/>
                                                </label>
                                                <label className="mt-radio">
                                                    <Field name="deposit" component="input" type="radio" value="no"/>  خیر
                                                    <span/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">توضیحات</label>
                                        <Field component="textarea"  name="reason" placeholder="توضیحات"
                                               className="form-control input-lg" id="name"/>
                                    </div>
                                    <button type="submit"
                                            className="btn btn-primary btn-lg change-deposit-btn btn-block">ذخیره
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'DepositModalPTRForm'
})(DepositModalPTR);
