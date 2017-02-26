import React, {Component} from "react";
import {connect} from "react-redux";
import BillingListPTR from "./BillingListPTR";
import {sync} from "../../../functions/sync";
import swagger from "./../../../swagger/index";
import {select} from "../../../functions/select";
import {billingListAction} from "../../../redux/actions/index";
import moment from "moment-jalali";
import {translatable} from "react-multilingual/dist";
import {PersianNumber} from "react-persian";

@connect(({billingList}) => ({billingList}))
@translatable(({
    ID,CreatedAt, UpdatedAt,
    Action,Email, UserID,
    PaymentID, Amount, Reason

}) => ({
    translation: {
        ID,CreatedAt, UpdatedAt,
        Action,Email, UserID,
        PaymentID, Amount, Reason
    }
}))
export default class BillingListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.BillingApi).billingGet(select('user.token', 'no token'), {
                ...select('queries.billing', {}),
                [query_name]: value
            });

            dispatch(billingListAction(data));
        })
    }

    sort(flag, query_name) {
        this.callApi('sort', query_name + ':' + flag)
    }

    filter(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    search(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    edit(id) {
    }

    changeFormatToPersian(number) {
        if (number == null) return;
        return <PersianNumber>{number.toString()}</PersianNumber>
    }


    updated_at(updated_at) {
        return <PersianNumber> {moment(updated_at).format('dddd، jD jMMMM jYYYY')} </PersianNumber>;
    }

    created_at(created_at) {
        return <PersianNumber>{moment(created_at).format('dddd، jD jMMMM jYYYY')}</PersianNumber>;
    }

    onPaginationChange(page) {
        this.callApi('p', page);
    }

    onPerPageChange(per_page) {
        this.callApi('c', per_page);
    }

    translator(title) {
        return this.props.translation[title];
    }

    render() {
        return (<BillingListPTR {...this.props.billingList}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
                                 onPaginationChange={this.onPaginationChange.bind(this)}
                                 onPerPageChange={this.onPerPageChange.bind(this)}
                                 mutators={{
                                     updated_at: this.updated_at,
                                     created_at: this.created_at,
                                     id: this.changeFormatToPersian.bind(this),
                                     user_id: this.changeFormatToPersian.bind(this),
                                     payment_id: this.changeFormatToPersian.bind(this),
                                     amount: this.changeFormatToPersian.bind(this)
                                 }}
                                 edit={this.edit.bind(this)}
                                 translator={this.translator.bind(this)}
        />)
    }
}
