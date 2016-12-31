import React, {Component} from 'react';
import EditChannelPTR from './EditChannelModalPTR';
import {connect} from "react-redux";
let Ladda = require('ladda/js/ladda');

@connect(({channelData}) => ({channelData}))
export default class EditChannelModalCTR extends Component {
    loadingProgress;

    loading() {
        this.loadingProgress = Ladda.create(document.querySelector('button.edit-channel-form'));
        this.loadingProgress.start();
    }

    stopLoading() {
        if (this.loadingProgress)
            this.loadingProgress.stop();
    }

    render() {
        return (<EditChannelPTR channelData={this.props.channelData}/>);
    }
}