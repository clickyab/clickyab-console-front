import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from "react-redux";

@connect(({user}) => ({user}))
export default class SessionListPTR extends Component {


    componentDidMount() {

    }


    render() {
        return (
                <div className="session-list">
                    <div className="note note-success">
                        <h3>لیست سشن های فعال شما</h3>
                        <p> لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید
                        </p>
                    </div>
                    <div className="session-item">
                        <div className="session-item-body">
                            <div className="session-item-info">
                                <span className="session-user-agent">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36</span>
                                <span className="session-date">23:05</span>
                            </div>
                            <div className="session-ip"> 46.101.116.7 </div>
                            <div className="session-details">
                                <div className="session-item-actions">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-outline red btn-sm">حذف سشن</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="session-item">
                        <div className="session-item-body">
                            <div className="session-item-info">
                                <span className="session-user-agent">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36</span>
                                <span className="session-date">23:05</span>
                            </div>
                            <div className="session-ip"> 46.101.116.7 </div>
                            <div className="session-details">
                                <div className="session-item-actions">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-outline red btn-sm">حذف سشن</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}
