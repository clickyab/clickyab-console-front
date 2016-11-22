import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';


export default class MainLinksPublisher extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="mt-element-step mb2">
                <div className="row step-default">

                    <a href="#" className="col-md-4 bg-grey mt-step-col error">
                        <div className="mt-step-title uppercase font-grey-cascade">انتخاب و انتشار تبلیغ</div>
                    </a>
                    <a href="#" className="col-md-4 bg-grey mt-step-col done">
                        <div className="mt-step-title uppercase font-grey-cascade">لیست تبلیغات انتخاب شده </div>
                    </a>
                    <a href="#" className="col-md-4 bg-grey mt-step-col active">
                        <div className="mt-step-title uppercase font-grey-cascade">تبلیغات منتشر شده</div>
                    </a>
                </div>
            </div>
        )
    }
}