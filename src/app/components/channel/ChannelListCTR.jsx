import React, {Component} from "react";
import {connect} from "react-redux";
import ChannelListPTR from "./ChannelListPTR";
import swagger from '../../swagger/index';
import {select} from "../../functions/select";
import {channelListAction} from "../../redux/actions/index";

@connect(({channelList}) => ({channelList}))
export default class ChannelListCTR extends Component {
    sort(flag, query_name) {
        console.log(flag, query_name)
    }

    filter(event, query_name) {
        console.log(event.target.value, query_name)
    }

    search(event, query_name) {
        (new swagger.ChannelApi)
            .channelListGet(select('user.token', 'no token'), {
                [query_name]: event.target.value,
                def: true
            }).then(
            ({error, data, response}) => {
                console.log(data);
                this.props.dispatch(channelListAction(data));
            },
            error => {
                console.log(error)
            }
        );
    }

    render() {
        const {items, definitions} = this.props.channelList;

        return (<ChannelListPTR items={items} definitions={definitions}
                                sort={this.sort.bind(this)}
                                filter={this.filter.bind(this)}
                                search={this.search.bind(this)}
        />);
    }
}