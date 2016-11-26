import React, {Component} from 'react';
import {Footer} from './Footer';
import {Header} from './Header';
import {Sidebar} from './Sidebar';
// import {Link} from 'react-router';


export class Index extends Component {
    render() {
        let children = this.props.children;
        return (
            <div className="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
                <div className="page-wrapper">
                    <Header/>
                    <div className="page-container">
                        <Sidebar/>
                        <div className="page-content-wrapper">
                                {children}
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    children: React.PropTypes.element
};

export default Index;


