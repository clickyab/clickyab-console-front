import React, {Component} from "react";
import {connect} from "react-redux";
import BillingListPTR from "./BillingListPTR";
import {sync} from "../../../functions/sync";
import swagger from "./../../../swagger/index";
import {select} from "../../../functions/select";
import {billingListAction} from "../../../redux/actions/index";
import moment from "moment-jalali";
import {translatable} from "react-multilingual/dist";
import EditBillingButton from './EditBillingButton';
import ChangeBillingStatus from "./ChangeBillingStatus";

@connect(({billingList}) => ({billingList}))
@translatable(({
    ID,CreatedAt, UpdatedAt,
    Action,Email, UserID,
    PaymentID, Amount, Reason , accepted, pending, rejected , Type , Status , Deposit , yes , no

}) => ({
    translation: {
        ID,CreatedAt, UpdatedAt,
        Action,Email, UserID,
        PaymentID, Amount, Reason , accepted, pending, rejected, Type , Status , Deposit , yes , no
    }
}))
export default class BillingListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.BillingApi).billingListGet(select('user.token', 'no token'), {
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
        return <EditBillingButton key={Math.random()} id={id} />
    }

    updated_at(updated_at) {
        return moment(updated_at).format('jYYYY/jM/jD');
    }
    status(status, {id, _actions}) {
        if (_actions.split(',').includes("status")) {
            return <ChangeBillingStatus id={id} status={status} translator={this.translator.bind(this)}/>;
        }
        let span;
        if (status == 'pending') {
            span = <span className="label  label-warning"> {this.translator(status)} </span>;
        } else if (status == 'accepted') {
            span = <span className="label  label-success"> {this.translator(status)} </span>;
        } else if (status == 'rejected') {
            span = <span className="label  label-danger"> {this.translator(status)} </span>;
        }

        return span;
    }

    deposit(deposit) {
        let span;
        if (deposit == 'yes') {
            span = <span className="label  label-success"> {this.translator(deposit)} </span>;
        } else if (deposit == 'no') {
            span = <span className="label  label-danger"> {this.translator(deposit)} </span>;
        }

        return span;
    }

    created_at(created_at) {
        return moment(created_at).format('jYYYY/jM/jD');
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
                                edit={this.edit.bind(this)}
                                translator={this.translator.bind(this)}
                                mutators={{
                                    updated_at: this.updated_at,
                                    created_at: this.created_at,
                                    status : this.status.bind(this),
                                    deposit : this.deposit.bind(this)
                                }}
        />)
    }
}