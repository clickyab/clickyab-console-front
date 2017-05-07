import React from "react";
import AdvertiserSidebar from "./../advertiser/Dashboard/SidebarPTR";

export default function Advertiser({children}) {
    return (
		<div className="page-container">
			<AdvertiserSidebar/>
			<div className="page-content-wrapper">
                {children}
			</div>
		</div>
    );
}