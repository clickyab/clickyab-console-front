import React, {Component} from 'react';
import {connect} from 'react-redux';
import UsersListPTR from './UsersListPTR';
import swagger from '../../swagger/index';
import {select} from '../../functions/select';
import {userListAction} from '../../redux/actions/index';

@connect(({userList}) => ({userList}))
export default class UsersListCTR extends Component {
    callApi(query_name, value) {
        (new swagger.UserApi)
            .userUsersGet(select('user.token', 'no token'), {
                [query_name]: value,
                def: true
            }).then(
            ({error, data, response}) => {
                this.props.dispatch(userListAction(data));
            },
            error => {
                console.log(error)
            }
        );
    }

    sort(flag, query_name) {
        this.callApi(query_name, flag);
    }

    filter(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    search(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    render() {
        const {items, definitions} = this.props.userList;

        return (<UsersListPTR items={items} definitions={definitions}
                              sort={this.sort.bind(this)}
                              filter={this.filter.bind(this)}
                              search={this.search.bind(this)}
        />);
    }
}