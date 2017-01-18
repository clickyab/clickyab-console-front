import React, {Component} from "react";
import {connect} from "react-redux";
import TelegramListPTR from './TelegramListPTR';
import {sync} from "../../functions/sync";
import swagger from './../../swagger/index';
import {select} from "../../functions/select";
import {telegramItemsListAction} from "../../redux/actions/index";
import moment from "moment-jalali";

@connect(({telegramList}) => ({telegramList}))
export default class TelegramListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.TelegramApi).telegramListGet(select('user.token', 'no token'), {
                ...select('queries.telegram', {}),
                [query_name]: value
            });

            dispatch(telegramItemsListAction(data));
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
        console.log(id);
    }


    updated_at(updated_at) {
        return moment(updated_at).format('dddd، jD jMMMM jYYYY');
    }

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
    }
    render() {
        const {items, definitions} = this.props.telegramList;
        return(<TelegramListPTR
                    items={items} definitions={definitions}
                    sort={this.sort.bind(this)}
                    filter={this.filter.bind(this)}
                    search={this.search.bind(this)}
                    mutators={{updated_at: this.updated_at, created_at: this.created_at}}
                    edit={this.edit.bind(this)}
        />)
    }
}