import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';

@translatable(({copyright}) => ({copyright}))
export class FooterFullScreen extends Component {
    render() {
        let {copyright, changeLocale} = this.props;
        return (
        <div className="login-footer">
            <div className="row bs-reset">
                <div className="col-xs-7 bs-reset">
                    <div className="login-copyright text-left">
                        <p>{copyright}</p>
                    </div>
                </div>
                <div className="col-xs-5 bs-reset">
                    <ul className="login-social">
                        <li>
                            <a onClick={() => changeLocale('en')} className="btn btn-link" type="button">EN</a>
                        </li>
                        <li>
                            <a onClick={() => changeLocale('fa')} className="btn btn-link" type="button">فا</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}

FooterFullScreen.propTypes = {
    copyright: React.PropTypes.string,
    changeLocale: React.PropTypes.func,
};
