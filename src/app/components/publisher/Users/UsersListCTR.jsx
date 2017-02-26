import React, {Component} from "react";
import {connect} from "react-redux";
import UsersListPTR from "./UsersListPTR";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {userItemsListAction} from "../../../redux/actions/index";
import EditUserButton from "./EditUserButton";
import moment from "moment-jalali";
import {sync} from "../../../functions/sync";
import {translatable} from "react-multilingual/dist";
import {PersianNumber} from "react-persian";

@connect(({userList}) => ({userList}))
@translatable(({
    ID,
    Email,
    Type,
    Status,
    CreatedAt,
    UpdatedAt,
    Action,
    corporation,
    personal,
    blocked,
    registered,
    verified

}) => ({
    translation: {
        ID,
        Email, Type,
        Status, CreatedAt, UpdatedAt,
        Action, corporation, personal,
        blocked, registered, verified
    }
}))
export default class UsersListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.UserApi)
                .userUsersGet(select('user.token', 'no token'), {
                    ...select('queries.user', {}),
                    [query_name]: value
                });

            dispatch(userItemsListAction(data));
        });
    }

    sort(flag, query_name) {
        this.callApi(query_name, flag);
    }

    updated_at(updated_at) {
        return <PersianNumber> {moment(updated_at).format('dddd، jD jMMMM jYYYY')} </PersianNumber>
    }

    created_at(created_at) {
        return <PersianNumber> {moment(created_at).format('dddd، jD jMMMM jYYYY')} </PersianNumber>
    }

    filter(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    search(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    edit(id) {
        return <EditUserButton key={Math.random()} id={id}/>
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

    status(status) {
        if (status == 'registered') {
            return <span className="label label-sm label-warning"> {this.translator(status)} </span>;
        } else if (status == 'verified') {
            return <span className="label label-sm label-success"> {this.translator(status)} </span>;
        } else if (status == 'blocked') {
            return <span className="label label-sm label-danger"> {this.translator(status)} </span>;
        }

        return status;
    }

    user_type(user_type) {
        return this.translator(user_type);
    }

    changeFormatToPersian(number) {
        if (number == null) return;
        return <PersianNumber>{number.toString()}</PersianNumber>
    }

    render() {
        return (<UsersListPTR {...this.props.userList}
                              edit={this.edit.bind(this)}
                              sort={this.sort.bind(this)}
                              translator={this.translator.bind(this)}
                              filter={this.filter.bind(this)}
                              onPaginationChange={this.onPaginationChange.bind(this)}
                              onPerPageChange={this.onPerPageChange.bind(this)}
                              mutators={{
                                  updated_at: this.updated_at, created_at: this.created_at,
                                  user_type: this.user_type.bind(this), status: this.status.bind(this),
                                  id: this.changeFormatToPersian
                              }}
                              search={this.search.bind(this)}
        />);
    }
}