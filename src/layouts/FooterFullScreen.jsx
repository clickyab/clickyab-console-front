import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';

@translatable(({copyright}) => ({copyright}))
export class FooterFullScreen extends Component {
    render() {
        let {copyright, changeLocale} = this.props;
        return (
            <div className="footerFullScreen">
                <div className="copyright"> {copyright}</div>
                <div className="center-align-page white">
                    <a onClick={() => changeLocale('en')} className="btn btn-link" type="button">EN</a>
                    <a onClick={() => changeLocale('fa')} className="btn btn-link" type="button">فا</a>
                </div>
            </div>
        )
    }
}

FooterFullScreen.propTypes = {
    copyright: React.PropTypes.string,
    changeLocale: React.PropTypes.func,
};
