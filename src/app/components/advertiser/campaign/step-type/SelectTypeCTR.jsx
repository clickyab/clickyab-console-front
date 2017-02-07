import React, {Component} from "react";
import SelectTypePTR from "./SelectTypePTR";

export default class SelectTypeCTR extends Component {
    render() {
        return (<SelectTypePTR SubmitCreateCampaignName={this.SubmitCreateCampaignName}/>);
    }
}