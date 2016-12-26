import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from './CampaignListPTR';

@connect(({campaignList}) => ({campaignList}))
export default class CampaignListCTR extends Component {
    sort(flag, query_name) {
        console.log(flag, query_name)
    }

    filter(event, query_name) {
        console.log(event.target.value, query_name)
    }

    search(event, query_name) {
        console.log(event.target.value, query_name)
    }

    render() {
        const {items, definitions} = this.props.campaignList;

        return (<CampaignListPTR items={items} definitions={definitions}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
        />);
    }
}