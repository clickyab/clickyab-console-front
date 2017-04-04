import React, {Component} from "react";
import {ConsoleTable} from "../../common/ConsoleTable/ConsoleTable";
import WithdrawModalCTR from './WithdrawModalCTR';
import {securify} from "../../../functions/securify";

export default class BillingListPTR extends Component {

    componentDidMount() {
        $(document).on('click', '#withdrawModal', function() {
            $('#withDrawModal').modal();
        })
    }

    render() {
        return (
            <div className='page-content'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'> مدیریت پرداخت‌ها</h1>
                    </div>
                </div>
                <div className='portlet light bordered datatable-parent'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'>لیست پرداخت‌ها</span>
                        </div>
                        <div className="actions">
                            <div className="btn-group btn-group-devided" data-toggle="buttons">
                                <button className="btn btn-transparent blue btn-outline btn-circle btn-sm"
                                        id="withdrawModal">درخواست برداشت
                                </button>
                            </div>
                        </div>
                    </div>
                    {securify(
                        () => <div className='portlet-body'>
                            <ConsoleTable {...this.props} list="billing"/>
                        </div>,
                        ({user}, {canSeeBillingList}, run) => run(canSeeBillingList())
                    )}

                </div>
                <WithdrawModalCTR />
            </div>
        )
    }
}

BillingListPTR.propTypes = {
    items: React.PropTypes.array
};
