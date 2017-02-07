import React, {Component} from "react";
import AdvertiserSidebar from "./../advertiser/Dashboard/SidebarPTR";

export default class Advertiser extends Component {
    render() {
        let {children} = this.props;
        return (
            <div className="page-container">
                <AdvertiserSidebar/>
                <div className="page-content-wrapper">
                    {children}
                </div>
            </div>
        );
    }

}