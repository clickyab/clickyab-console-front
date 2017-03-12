import React, {Component} from "react";
import {Link} from "react-router";
import {sync} from "../../functions/sync";
import * as swagger from "../../swagger/index";
import {getToken} from "../../redux/helpers";

export default class CreditMenu extends Component {
    clicked = true;
    state = {
        amount: 0
    };

    credit() {
        sync(function*() {
            let {error, data, response} = yield (new swagger.BillingApi())
                .billingBillingShowGet(getToken());

            if (response.statusCode == '200') {
                this.setState({amount: data.Billing})

            } else if (response.statusCode == '400') {
                this.setState({amount: 0})
            }
        }.bind(this))
    }


    refreshCredit() {
        if (this.clicked) {
            this.credit();
            $('.fa-refresh').css('color', 'gray');
            this.clicked = false;
        }
        setTimeout(() => {
            $('.fa-refresh').css('color', 'green');
            this.clicked = true;
        }, 10000);
    }

    keepOpen(e) {
        $(e.target).parents('ul').addClass('keep_open');
    }

    keepClose(e) {
        $(e.target).parents('ul').removeClass('keep_open');
    }

    componentDidMount() {
        this.credit();
    }

    render() {
        return (
            <li>
                <Link style={{cursor: 'default'}}>
                    <i className="fa fa-money"/> اعتبار:
                    <span className="bold"> {this.state.amount} </span>
                    تومان
                    <i className="fa fa-refresh" onMouseEnter={this.keepOpen} onMouseLeave={this.keepClose}
                       onClick={this.refreshCredit.bind(this)} style={{float: 'left', cursor: 'pointer', color: 'green'}}/>
                </Link>
            </li>
        )
    }
}