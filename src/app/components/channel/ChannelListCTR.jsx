import React, {Component} from "react";
import {connect} from "react-redux";
import ChannelListPTR from "./ChannelListPTR";

@connect()
export default class ChannelListCTR extends Component {
    render() {
        return (<ChannelListPTR SubmitCall={() => {
        }}/>);
    }
}