import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';

class SelectMode extends Component {
    render() {
        return(
            <div className="page-content">
                <div className="page-content-inner">
                    <div className="note note-success note-bordered">
                        <span>آخرین اخبار : </span>
                        <em>سلام چطوری؟</em>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-6">
                        <button className="selectModeBtn">
                            <h4>تبلیغ کننده هستم</h4>
                            <h1>ایجاد کمپین تبلیغاتی</h1>
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="selectModeBtn">
                            <h4>تبلیغ کننده هستم</h4>
                            <h1>ایجاد کمپین تبلیغاتی</h1>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = SelectMode;