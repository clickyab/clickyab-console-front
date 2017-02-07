import React, {Component} from "react";
import {connect} from "react-redux";
// import $ from 'jquery';

@connect(({user}) => ({user}))
export default class SessionListPTR extends Component {


    componentDidMount() {

    }


    render() {
        return (
            <div className="session-list">
                <div className="note note-success">
                    <h3>لیست سشن های فعال شما</h3>
                    <p> لیستی از سشن های فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید
                        برای شما نمایش داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید لیستی از سشن های
                        فعال شما که در مرورگر های مختلف و یا رایانه های مختلف که سایت را باز کرده اید برای شما نمایش
                        داده شده است می توانید همه سشن ها جز سشن فعلی خود را پاک نمایید
                    </p>
                </div>
            </div>
        )
    }

}
