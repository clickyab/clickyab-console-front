import React, {Component} from "react";
import {connect} from "react-redux";
import CampaignListPTR from './CampaignListPTR';
import Edit from '../common/DataTable/Edit';

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

    edit(id) {
        return <Edit key={Math.random()} id={id}/>
    }


    render() {
        const {items, definitions} = this.props.campaignList;

        return (<CampaignListPTR items={items} definitions={definitions}
                                 edit={this.edit.bind(this)}
                                 sort={this.sort.bind(this)}
                                 filter={this.filter.bind(this)}
                                 search={this.search.bind(this)}
        />);
    }
}