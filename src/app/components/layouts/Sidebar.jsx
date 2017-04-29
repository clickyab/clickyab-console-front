import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import AdvertiserSidebar from "./../advertiser/Dashboard/SidebarPTR";
import PublisherSidebar from "./../publisher/Dashboard/SidebarPTR";

@connect(({userType}) => ({userType}))
export default class Sidebar extends Component {
    render() {
        const {userType} = this.props;
        const sidebar = userType == "advertiser" ? <AdvertiserSidebar/> : <PublisherSidebar/>;
        return (sidebar)
    }
}

Sidebar.propTypes = {
    userType: PropTypes.oneOf(['advertiser', 'publisher'])
};