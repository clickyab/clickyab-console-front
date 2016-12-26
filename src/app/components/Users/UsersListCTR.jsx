import React, {Component} from "react";
import {connect} from "react-redux";
import UsersListPTR from './UsersListPTR';
import swagger from '../../swagger/index';
import {select} from "../../functions/select";

@connect(({userList}) => ({userList}))
export default class UsersListCTR extends Component {
    sort(flag, query_name) {
        console.log(flag, query_name)
    }

    filter(event, query_name) {
        console.log(event.target.value, query_name)
    }

    search(event, query_name) {
        (new swagger.UserApi)
            .userUsersGet(select('user.token', 'no token'), {
                [query_name]: event.target.value
            }).then(
            ({error, data, response}) => {
                console.log(data.data);
            },
            error => {
                console.log(error)
            }
        );
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