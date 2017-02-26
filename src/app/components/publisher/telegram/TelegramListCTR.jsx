import React, {Component} from "react";
import {connect} from "react-redux";
import TelegramListPTR from "./TelegramListPTR";
import {sync} from "../../../functions/sync";
import swagger from "./../../../swagger/index";
import {select} from "../../../functions/select";
import {telegramItemsListAction} from "../../../redux/actions/index";
import moment from "moment-jalali";
import {PersianNumber} from "react-persian";
import {translatable} from "react-multilingual/dist";

@connect(({telegramList}) => ({telegramList}))
@translatable(({
    ID, Name, Description,
    CreatedAt, UpdatedAt, Action,
    Email, UserID, BotChatID, Username,
    Resolve, Remove

}) => ({
    translation: {
        ID, Name, Description,
        CreatedAt, UpdatedAt, Action,
        Email, UserID, BotChatID, Username,
        Resolve, Remove
    }
}))
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
    }


    updated_at(updated_at) {
        return <PersianNumber>{moment(updated_at).format('dddd، jD jMMMM jYYYY')}</PersianNumber>
    }

    created_at(created_at) {
        return <PersianNumber>{moment(created_at).format('dddd، jD jMMMM jYYYY')}</PersianNumber>
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

    changeFormatToPersian(number) {
        if (number == null) return;
        return <PersianNumber>{number.toString()}</PersianNumber>
    }

    render() {
        return (<TelegramListPTR {...this.props.telegramList}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
                                 onPaginationChange={this.onPaginationChange.bind(this)}
                                 onPerPageChange={this.onPerPageChange.bind(this)}
                                 mutators={{
                                     updated_at: this.updated_at,
                                     created_at: this.created_at,
                                     id: this.changeFormatToPersian,
                                     user_id: this.changeFormatToPersian,
                                     bot_chat_id: this.changeFormatToPersian,
                                 }}
                                 edit={this.edit.bind(this)}
                                 translator={this.translator.bind(this)}
        />)
    }
}