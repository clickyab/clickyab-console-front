import {store} from './redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import {Footer} from './components/layouts/Footer';
import {Header} from './components/layouts/HeaderCTR';
import Sidebar from './components/layouts/Sidebar';
import {loading} from "./functions/loading";

export default class App extends React.Component {
    componentDidMount() {
        loading(false);
    }

    render() {
        let {children} = this.props;
        return (
            <Provider store={store}>
                <div className="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
                    <div className="page-wrapper">
                        <Header/>
                        <div className="page-container" style={{display: 'flex'}}>
                            <Sidebar/>
                            <div className="page-content-wrapper" style={{flexGrow: 1}}>
                                {children}
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </Provider>
        )
    }
}
