import React, {Component} from 'react';
import {connect} from 'react-redux';
import UsersListPTR from './UsersListPTR';
import swagger from '../../swagger/index';
import {select} from '../../functions/select';
import {userItemsListAction} from '../../redux/actions/index';
import EditUserButton from "./EditUserButton";
import moment from "moment-jalali";
import {sync} from "../../functions/sync";

@connect(({userList}) => ({userList}))
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
        return moment(updated_at).format('dddd، jD jMMMM jYYYY');
    }

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
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

    render() {

        return (<UsersListPTR {...this.props.userList}
                              edit={this.edit.bind(this)}
                              sort={this.sort.bind(this)}
                              filter={this.filter.bind(this)}
                              onPaginationChange={this.onPaginationChange.bind(this)}
                              onPerPageChange={this.onPerPageChange.bind(this)}
                              mutators={{updated_at: this.updated_at, created_at: this.created_at}}
                              search={this.search.bind(this)}
        />);
    }
}