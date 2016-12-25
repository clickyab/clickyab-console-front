import React, {Component} from "react";
import {connect} from "react-redux";
import ChannelListPTR from "./ChannelListPTR";

@connect(({channelList}) => ({channelList}))
export default class ChannelListCTR extends Component {
    render() {
        const {items, definitions} = this.props.channelList;
        return (<ChannelListPTR items={items} definitions={definitions}/>);
    }
}