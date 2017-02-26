import React, {Component} from "react";
import {connect} from "react-redux";
import RolesListPTR from "./RolesListPTR";
import swagger from "../../../swagger/index";
import {select} from "../../../functions/select";
import {roleItemsListAction} from "../../../redux/actions/index";
import moment from "moment-jalali";
import {sync} from "../../../functions/sync";
import EditRoleButton from "./EditRoleButton";
import {translatable} from "react-multilingual/dist";
import {PersianNumber} from "react-persian";

@connect(({roleList, permissionList}) => ({roleList, permissionList}))
@translatable(({
    CreatedAt, UpdatedAt, Action,
    Name, ID, Description
}) => ({
    translation: {
        CreatedAt, UpdatedAt, Action,
        Name, ID, Description
    }
}))
export default class RolesListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.UserApi())
                .userRolesGet(select('user.token', 'no token'), {
                    ...select('queries.role', {}),
                    [query_name]: value
                });

            dispatch(roleItemsListAction(data));
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
        return <EditRoleButton key={Math.random()} id={id}/>
    }

    updated_at(updated_at) {
        return <PersianNumber> {moment(updated_at).format('dddd، jD jMMMM jYYYY')} </PersianNumber>
    }

    created_at(created_at) {
        return <PersianNumber> {moment(created_at).format('dddd، jD jMMMM jYYYY')} </PersianNumber>
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
        return (<RolesListPTR {...this.props.roleList}
                              permissions={this.props.permissionList.permissions}
                              sort={this.sort.bind(this)}
                              translator={this.translator.bind(this)}
                              filter={this.filter.bind(this)}
                              search={this.search.bind(this)}
                              onPerPageChange={this.onPerPageChange.bind(this)}
                              onPaginationChange={this.onPaginationChange.bind(this)}
                              mutators={{
                                  updated_at: this.updated_at,
                                  created_at: this.created_at,
                                  id: this.changeFormatToPersian
                              }}
                              edit={this.edit.bind(this)}
        />);
    }
}