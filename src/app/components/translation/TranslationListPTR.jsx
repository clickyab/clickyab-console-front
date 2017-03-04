import React, {Component} from "react";
import {ConsoleTable} from "./../common/ConsoleTable/ConsoleTable";

export default class TranslationListPTR extends Component {
    componentDidMount() {
        document.title = "مدیریت ترجمه ها";
    }

    render() {
        return (
            <div className='page-content'>
                <div className='row'>
                    <div className='col-lg-8 col-md-8 col-sm-8 col-xs-12'>
                        <h1 className='page-title'>ترجمه ها</h1>
                    </div>
                </div>
                <div className='portlet light bordered datatable-parent'>
                    <div className='portlet-title'>
                        <div className='caption'>
                            <span className='caption-subject bold uppercase font-dark'>لیست عبارات </span>
                        </div>
                    </div>
                    <div className='portlet-body'>
                        <ConsoleTable {...this.props} list="translation" action={false}/>
                    </div>
                </div>
            </div>
        )
    }
}