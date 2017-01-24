import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import NumericSelect from "./../../common/form/NumericSelect";
import {sync} from "../../../functions/sync";
import {getToken} from "../../../redux/helpers";
import {select} from "../../../functions/select";
import swagger from "../../../swagger/index";
import {dispatch} from "../../../functions/dispatch";
import {createCampaign, updateLocalStorageAction} from "../../../redux/actions/index";
import {navigate} from "../../../functions/navigate";
import {AlertBox} from "../../../functions/notifications";
let Ladda = require('ladda/js/ladda');



class SelectContentByChannelPTR extends Component {
    selectTypeContentForm;
    ids;
    channelText;
    loadingProgressSend;

    onClick(id, text) {
        return (event) => {
            $(event.target).parents(".channel-post").find("button.select-content-channel").addClass("btn-outline").text("انتخاب  به عنوان محتوای آگهی");
            $(event.target).removeClass("btn-outline");
            $(event.target).text("انتخاب شده");
            this.ids = id;
            this.channelText = text;
        };
    }

    send(event) {
        sync(function*() {
            this.loadingProgressSend = Ladda.create(document.querySelector('button.send-clid'));
            this.loadingProgressSend.start();
            if (this.ids) {
                let {data, response} = yield (new swagger.AdApi()).campaignPromoteIdPut(
                    select('createCampaignData.id'), getToken(), {
                        'payloadData': {
                            cli_message_id: this.ids
                        }
                    }
                );

                response.error = 'اطلاعات شما صحیح نمی‌باشد.';
                response.text = 'اطلاعات شما با موفقیت ثبت شد.';
                if (response.statusCode == '200') {
                    AlertBox("success" , "پست مورد نظر با موفقیت انتخاب شد");
                    this.loadingProgressSend.stop();
                    dispatch(createCampaign(Object.assign({}, select("createCampaignData"), {promotes: data, description: this.channelText})));
                    dispatch(updateLocalStorageAction());

                    navigate('/v1/campaign/create/:campaign_id:/step/plan', {
                        campaign_id: select('createCampaignData.id')
                    });
                } else if(response.statusCode == '400') {
                    AlertBox("error" , "اختلالی در سرور به وجود آمده است لطفا دوباهر تلاش کنید");
                    this.loadingProgressSend.stop();
                }
            }
        }.bind(this))
    }

    ChannelPostList() {
        let items = [];
        let {Postlist} = this.props;
        for (let key in Postlist.Data) {
            items.push(
                <div className="session-list right" key={key}>
                    <div className="session-item">
                        <div className="session-item-body">
                            <div className="session-item-info">
                                <span className="session-user-agent">{Postlist.Data[key].Text}</span>
                            </div>
                            <div className="session-ip"></div>
                            <div className="session-details">
                                <div className="session-item-actions">
                                    <div className="btn-group">
                                        <button onClick={this.onClick(Postlist.Data[key].CliID, Postlist.Data[key].Text)} type="button"
                                                className="btn btn-outline green btn-sm select-content-channel"
                                                data-key='+ this.key +'>انتخاب به عنوان محتوای آگهی
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
        }
        if (Postlist.Data != null) {
            items.push(<button type="submit" key={'asdasdasd'}
                               onClick={this.send.bind(this)}
                               className="btn mt-ladda-btn ladda-button btn-success btn-lg margin-top-20 pull-left send-clid"
                               data-style="zoom-in"><span className="ladda-label">ارسال</span></button>);
        }
        return items;

    };

    componentDidMount() {
        this.selectTypeContentForm = $('.get-posts-channel-form');
        this.selectTypeContentForm.validate({
            rules: {
                name: {
                    required: true,
                },
            },
            messages: {
                name: {
                    required: 'لطفا نام کمپین را وارد نمایید',
                },
            }
        });
    }


    render() {
        const {handleSubmit, SubmitGetPostsByChannel} = this.props;
        let telegramChannelTitle;
        if (select('createCampaignData.description') !=null) {
            telegramChannelTitle = select('createCampaignData.description');
        } else {
            telegramChannelTitle = 'ندارد';
        }
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20 padding-bottom-40">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> انتخاب محتوا بر اساس کمپین
                        </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20 when-select-content ">
                            <div className="row step-background">
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۱</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                    <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص
                                        دهید.
                                    </div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۲</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                        بازدید مشخص کنید
                                    </div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col active">
                                    <div className="mt-step-number">۳</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوا</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب محتوای کانال های دیگر
                                    </div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۴</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان
                                        بازدید مشخص کنید
                                    </div>
                                </div>

                            </div>
                            <br/>
                        </div>

                        <div className='row'>
                            <h2>۳- انتخاب محتوا</h2>
                            <div className="note note-success"><h3>انتخاب پست به عنوان تبلیغ از کانال های دیگر</h3><p>
                                لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز
                                کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید
                                لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز
                                کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک
                                نمایید</p></div>
                            <form method="post" className="get-posts-channel-form"
                                  onSubmit={handleSubmit((values) => SubmitGetPostsByChannel(values, this.selectTypeContentForm))}>
                                <div className="form-body">
                                    <div className='col-md-12 col-xs-12'>
                                        <div className="row margin-bottom-20">
                                            <p>پست انتخاب شده : <b>{telegramChannelTitle}</b></p>
                                            <div className="col-md-4">
                                                <label>یوزر نیم کانال</label>
                                                <div className="input-group input-group-lg form-group">
                                                    <span className="input-group-addon" id="sizing-addon1">@</span>
                                                    <Field type="text" component="input" name="name" id="name"
                                                           className="form-control" placeholder="Username"
                                                           aria-describedby="sizing-addon1"/></div>
                                            </div>
                                            <div className="col-md-2">
                                                <label>تعداد پست</label>
                                                <NumericSelect className="form-control no-margin input-lg" name="count"
                                                               id="count" form="SelectContentByChannelPTRForm">
                                                    <option value={5}>5</option>
                                                    <option value={10}>10</option>
                                                    <option value={20}>20</option>
                                                    <option value={30}>30</option>
                                                    <option value={50}>50</option>
                                                </NumericSelect>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <button type="submit"
                                                        className="btn blue btn-lg submit-get-posts-channel">نمایش پست
                                                    های کانال
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row margin-top-40">
                                            <div className="channel-post">
                                                {this.ChannelPostList()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default reduxForm({
    form: 'SelectContentByChannelPTRForm'
})(SelectContentByChannelPTR);