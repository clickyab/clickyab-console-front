import React, {Component} from 'react';
import {translatable} from 'react-multilingual/dist';

@translatable(({ copyright}) => ({copyright}))
export class Footer extends Component {
    render() {
        let {copyright, changeLocale} = this.props;
        return(
            <div className="page-footer">
                <div className="page-footer-inner"> {copyright}
                    <a onClick={() => changeLocale('en')} className="white" type="button">EN</a>
                    <a onClick={() => changeLocale('fa')} className="white" type="button">فا</a>
                </div>
                <div className="scroll-to-top">
                    <i className="icon-arrow-up"/>
                </div>

            </div>
        )
    }
}

Footer.propTypes = {
    copyright: React.PropTypes.string,
    changeLocale: React.PropTypes.func,
};
export default Footer;