import React, {Component} from "react";
import {connect} from "react-redux";
import ChannelListPTR from "./ChannelListPTR";
import swagger from '../../swagger/index';
import {select} from "../../functions/select";
import {channelListAction} from "../../redux/actions/index";

@connect(({channelList}) => ({channelList}))
export default class ChannelListCTR extends Component {
    callApi(query_name, value) {
        (new swagger.ChannelApi)
            .channelListGet(select('user.token', 'no token'), {
                [query_name]: value,
                def: true
            }).then(
            ({error, data, response}) => {
                this.props.dispatch(channelListAction(data));
            },
            error => {
                console.log(error)
            }
        );
    }

    sort(flag, query_name) {
        console.log(query_name, flag);
        this.callApi('sort', query_name + ':' + flag)
    }

    filter(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    search(event, query_name) {
        this.callApi(query_name, event.target.value);
    }

    change(event, id) {
        event.preventDefault();
        console.log(id)
    }

    edit(event, id) {
        event.preventDefault();
        console.log(id)
    }

    render() {
        const {items, definitions} = this.props.channelList;

        return (<ChannelListPTR items={items} definitions={definitions}
                                sort={this.sort.bind(this)}
                                filter={this.filter.bind(this)}
                                search={this.search.bind(this)}
                                edit={this.edit.bind(this)}
                                change={this.change.bind(this)}
        />);
    }
}