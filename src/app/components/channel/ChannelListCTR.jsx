import React, {Component} from "react";
import {connect} from "react-redux";
import ChannelListPTR from "./ChannelListPTR";
import EditChannelButton from "./EditChannelButton";
import swagger from '../../swagger/index';
import {select} from "../../functions/select";
import {channelItemsListAction} from "../../redux/actions/index";
import moment from "moment-jalali";
import {sync} from "../../functions/sync";

@connect(({channelList}) => ({channelList}))
export default class ChannelListCTR extends Component {
    callApi(query_name, value) {
        let {dispatch} = this.props;
        sync(function*() {
            let {data} = yield (new swagger.ChannelApi).channelListGet(select('user.token', 'no token'), {
                [query_name]: value
            });

            dispatch(channelItemsListAction(data));
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
        return <EditChannelButton key={Math.random()} id={id}/>
    }


    updated_at(updated_at) {
        return moment(updated_at).format('dddd، jD jMMMM jYYYY');
    }

    created_at(created_at) {
        return moment(created_at).format('dddd، jD jMMMM jYYYY');
    }

    render() {
        const {items, definitions} = this.props.channelList;

        return (<ChannelListPTR items={items} definitions={definitions}
                                sort={this.sort.bind(this)}
                                filter={this.filter.bind(this)}
                                search={this.search.bind(this)}
                                mutators={{updated_at: this.updated_at, created_at: this.created_at}}
                                edit={this.edit.bind(this)}
        />);
    }
}