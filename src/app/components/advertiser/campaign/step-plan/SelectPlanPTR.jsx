import React, {Component} from "react";
import {select} from "../../../../functions/select";
import {navigate} from "../../../../functions/navigate";
import {PersianNumber} from "react-persian";
import swagger from "../../../../swagger/index";
import {AlertBox} from "../../../../functions/notifications";
import {dispatch} from "../../../../functions/dispatch";
import {createCampaign, updateLocalStorageAction} from "../../../../redux/actions/index";
import {sync} from "../../../../functions/sync";
import CampaignStepPTR from "./../CampaignStepPTR";
import NumberFormat from "react-number-format";
let Ladda = require('ladda/js/ladda');

export default class SelectPlanPTR extends Component {
    state = {
        nextSubmit: false
    };
    planID;
    planName;
    stepPlan = this.state.nextSubmit ? 'done' : 'error';
    stepRowIndi = [{
        stepCondition: 'first done',
        stepNumber: '۱',
        stepName: 'Campaign Name'
    }, {
        stepCondition: 'done',
        stepNumber: '۲',
        stepName: 'Content Type'
    }, {
        stepCondition: 'done',
        stepNumber: '۳',
        stepName: 'File Upload'
    }, {
        stepCondition: 'done',
        stepNumber: '۴',
        stepName: 'Text Content'
    }, {
        stepCondition: this.stepPlan,
        stepNumber: '۵',
        stepName: 'Campaign Type'
    }, {
        stepCondition: 'last',
        stepNumber: '۶',
        stepName: 'Finish and Payment'
    }];

    stepRowPromote = [{
        stepCondition: 'first done',
        stepNumber: '۱',
        stepName: 'Campaign Name'
    }, {
        stepCondition: 'done',
        stepNumber: '۲',
        stepName: 'Content Type'
    }, {
        stepCondition: 'done',
        stepNumber: '۳',
        stepName: 'Channel Content'
    }, {
        stepCondition: this.stepPlan,
        stepNumber: '۴',
        stepName: 'Campaign Type'
    }, {
        stepCondition: 'last',
        stepNumber: '۵',
        stepName: 'Finish and Payment'
    }];

    stepRowIndiCreator() {
        let result = [];
        for (let i = 0; i < this.stepRowIndi.length; i++) {
            result.push(<CampaignStepPTR key={'row-' + i} stepCondition={this.stepRowIndi[i].stepCondition}
                                         stepNumber={this.stepRowIndi[i].stepNumber}
                                         stepName={this.stepRowIndi[i].stepName}/>)
        }
        return result;
    }

    stepRowPromoteCreator() {
        let result = [];
        for (let i = 0; i < this.stepRowPromote.length; i++) {
            result.push(<CampaignStepPTR key={'row-' + i} stepCondition={this.stepRowPromote[i].stepCondition}
                                         stepNumber={this.stepRowPromote[i].stepNumber}
                                         stepName={this.stepRowPromote[i].stepName}/>)
        }
        return result;
    }


    componentDidMount() {
        document.title = "ساختن کمپین جدید | انتخاب پلن تبلیغاتی";
    }

    onSelectPlan(plan_id, plan_name) {
        return (event) => {
            this.planID = plan_id;
            this.planName = plan_name;
            this.setState({
                nextSubmit: true
            });
            $(event.target).parents(".plan-list").find("button.plan-select-btn").addClass("btn-outline").text("انتخاب");
            $(event.target).removeClass("btn-outline");
            $(event.target).text("انتخاب شده");
        };
    }

    sendPlan() {
        sync(function*() {
            if (this.planID) {
                this.loadingProgressSend = Ladda.create(document.querySelector('button.next-step'));
                this.loadingProgressSend.start();
                let {response} = yield (new swagger.AdApi()).campaignPlanIdPut(
                    select('createCampaignData.id'), select('user.token', 'no token'), {
                        'payloadData': {
                            plan_id: this.planID
                        }
                    }
                );
                if (response.statusCode === 200) {
                    this.loadingProgressSend.stop();
                    dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {
                        plan_id: this.planID,
                        plan_name: this.planName
                    })));
                    dispatch(updateLocalStorageAction());

                    navigate('/v1/advertiser/campaign/create/:campaign_id:/step/preview', {
                        campaign_id: select('createCampaignData.id')
                    });
                } else if (response.statusCode === 400) {
                    AlertBox("error", "اختلالی در سرور به وجود آمده است لطفا دوباره تلاش کنید");
                    this.loadingProgressSend.stop();
                }
            }
        }.bind(this))
    }

    PlanList() {
        let items = [];
        let {PlanList} = this.props;
        for (let key in PlanList.items) {
            items.push(
                <div className="col-md-3" key={key}>
                    <div className="price-column-container border-active">
                        <div className="price-table-head bg-blue">
                            <h2 className="no-margin"> {PlanList.items[key].name}</h2>
                        </div>
                        <div className="arrow-down border-top-blue"/>
                        <div className="price-table-pricing">
                            <h2 className="persian-number">
                                <NumberFormat value={PlanList.items[key].price} displayType={'text'}
                                              thousandSeparator={true}/>
                                <sup className="price-sign">تومان</sup>
                            </h2>
                            <p>تعداد نمایش: <span><NumberFormat value={PlanList.items[key].view} displayType={'text'}
                                                                thousandSeparator={true}/></span></p>
                        </div>
                        <div className="price-table-content">
                            <p className="mobile-padding"> {PlanList.items[key].description}</p>
                        </div>
                        <div className="arrow-down arrow-grey"></div>
                        <div className="price-table-footer">
                            <button onClick={this.onSelectPlan(PlanList.items[key].id, PlanList.items[key].name)}
                                    type="button"
                                    className="btn green-haze btn-outline sbold uppercase price-button plan-select-btn">
                                انتخاب
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return items;

    };

    render() {
        let campaignTitle = select("createCampaignData.name", "no title");
        let data;
        if (select('campaignStepData.type') == 'upload') {
            data = this.stepRowIndiCreator();
        } else if (select('campaignStepData.type') == 'promote') {
            data = this.stepRowPromoteCreator();
        }
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20">

                    <div className="portlet-title">
                        <div className="caption font-blue">
                            <i className="fa fa-bullseye font-blue"/>انتخاب پلن تبلیغاتی کمپین <span
                            className="campaign-title bold">{campaignTitle}</span></div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20 when-generate-content">
                            <div className="row step-line">
                                {data}
                            </div>
                        </div>
                        <div className="margin-top-40">
                            <div className="pricing-content-1">
                                <div className="row">
                                    <h2>۴- انتخاب پلن تبلیغاتی و پرداخت</h2>
                                    <div className="plan-list">
                                        {this.PlanList()}
                                    </div>
                                </div>
                                <div className="col-md-12 margin-top-20 space-btn">
                                    <button onClick={
                                        () => {
                                            if (select('createCampaignData.promotes') == null) {
                                                navigate('/v1/advertiser/campaign/create/:campaign_id:/step/editor', {
                                                    campaign_id: select('createCampaignData.id')
                                                });
                                            } else {
                                                navigate('/v1/advertiser/campaign/create/:campaign_id:/step/promote', {
                                                    campaign_id: select('createCampaignData.id')
                                                });
                                            }
                                        }
                                    } className="btn btn-default  button-next btn-arrow-text margin-top-40"
                                            type="submit"><i
                                        className="fa fa-angle-right"/> مرحله قبل
                                    </button>
                                    <button onClick={this.sendPlan.bind(this)}
                                            className="btn btn-info  button-next btn-arrow-text margin-top-40 next-step"
                                            type="submit" disabled={!this.state.nextSubmit}>مرحله بعد <i
                                        className="fa fa-angle-left"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
