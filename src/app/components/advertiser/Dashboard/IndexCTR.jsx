import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';
import TotalCampaignsBoxPTR from './../../../components/advertiser/Dashboard/TotalCampaignsBoxPTR';
import TotalShowAdsBoxPTR from './../../../components/advertiser/Dashboard/TotalShowAdsBoxPTR';
import TotalValidClicksBoxPTR from './../../../components/advertiser/Dashboard/TotalValidClicksBoxPTR';
import TotalBalanceBoxPTR from './../../../components/advertiser/Dashboard/TotalBalanceBoxPTR';
import ClicksChartPTR from './../../../components/advertiser/Dashboard/ClicksChartPTR';
import BudgetChartPTR from './../../../components/advertiser/Dashboard/BudgetChartPTR';


@translatable(({
    DashboardTitle
})=>({
    DashboardTitle
}))

export default class AdvertiserDashboardPage extends Component {

    

    render() {
        let {DashboardTitle} = this.props;
        return (
            <div className='page-content'>

                <div className='page-bar'>
                    <ul className='page-breadcrumb pull-right'>
                        <li>
                            <a href='index.html'>داشبورد</a>
                            <i className='fa fa-circle'/>
                        </li>
                        <li>
                            <span>کمپین های من</span>
                        </li>
                    </ul>
                    <div className='page-toolbar pull-left'/>
                </div>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'> کمپین ها</h1>
                    </div>
                    <div className='top-action-header'>
                        <button type='button' className='btn blue-madison pull-left'>ساخت تبلیغ جدید</button>
                    </div>
                </div>
                <div className='row'>
                    <TotalCampaignsBoxPTR/>
                    <TotalValidClicksBoxPTR/>
                    <TotalShowAdsBoxPTR/>
                    <TotalBalanceBoxPTR/>
                </div>
                <div className='row'>
                    <ClicksChartPTR/>
                    <BudgetChartPTR/>
                </div>
            </div>
        );
    }
}

AdvertiserDashboardPage.propTypes = {
    DashboardTitle: React.PropTypes.string,
};


