import React, {Component} from "react";
import $ from "jquery";
import {Field, reduxForm} from "redux-form";
import NumericSelect from "./../../common/form/NumericSelect";


class SelectContentByChannelPTR extends Component {
    selectTypeContentForm;
    ids;
    onClick(id) {
        return (event) => {
            $(event.target).parents(".channel-post").find("button").addClass("btn-outline");
            $(event.target).removeClass("btn-outline");
            this.ids = id;
        };
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
                                        <button onClick={this.onClick(Postlist.Data[key].CliID)} type="button" className="btn btn-outline green btn-sm" id="delete-session"
                                                data-key='+ this.key +'>انتخاب به عنوان محتوای آگهی
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>);
        }
        if(Postlist.Data != null) {
            items.push(<button type="submit" key={Postlist} className="btn mt-ladda-btn ladda-button btn-success btn-lg margin-top-20 pull-left" data-style="zoom-in"><span className="ladda-label">ارسال</span></button>);
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
        return (
            <div className="page-content">

                <div className="portlet light margin-top-20 padding-bottom-40">

                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fa fa-bullseye"/> انتخاب محتوا بر اساس کمپین </div>
                    </div>
                    <div className="portlet-body form">
                        <div className="mt-element-step margin-top-20 when-select-content ">
                            <div className="row step-background">
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۱</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">نام کمپین</div>
                                    <div className="mt-step-content font-grey-cascade">یک نام به کمپین خود اختصاص دهید.</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۲</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب نوع محتوا</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان بازدید مشخص کنید</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col active">
                                    <div className="mt-step-number">۳</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب محتوا</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب محتوای کانال های دیگر</div>
                                </div>
                                <div className="col-md-3 bg-grey-steel mt-step-col">
                                    <div className="mt-step-number">۴</div>
                                    <div className="mt-step-title uppercase font-grey-cascade">انتخاب پلن</div>
                                    <div className="mt-step-content font-grey-cascade">انتخاب پلن را بر اساس میزان بازدید مشخص کنید</div>
                                </div>

                            </div>
                            <br/>
                        </div>
                        <div className='row'>
                            <h2>۳- انتخاب محتوا</h2>
                            <div className="note note-success"><h3>انتخاب پست به عنوان تبلیغ از کانال های دیگر</h3><p> لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید</p></div>
                            <form  method="post" className="get-posts-channel-form" onSubmit={handleSubmit((values) => SubmitGetPostsByChannel(values, this.selectTypeContentForm))}>
                                <div className="form-body">
                                    <div className='col-md-12 col-xs-12'>
                                        <div className="row margin-bottom-20">
                                            <div className="col-md-4">
                                                <label>یوزر نیم کانال</label>
                                                <div className="input-group input-group-lg form-group">
                                                    <span className="input-group-addon" id="sizing-addon1">@</span>
                                                    <Field type="text" component="input" name="name" id="name" className="form-control" placeholder="Username" aria-describedby="sizing-addon1"/> </div>
                                            </div>
                                            <div className="col-md-1">
                                                <label>تعداد پست</label>
                                                <NumericSelect  className="form-control no-margin input-lg" name="count" id="count">
                                                    <option>5</option>
                                                    <option>10</option>
                                                    <option>20</option>
                                                    <option>30</option>
                                                    <option>50</option>
                                                </NumericSelect>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <button type="submit" className="btn blue btn-lg submit-get-posts-channel">نمایش پست های کانال</button>
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