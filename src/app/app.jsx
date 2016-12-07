import {store} from './redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import {Footer} from './components/layouts/Footer';
import {Header} from './components/layouts/Header';
import Sidebar from './components/layouts/Sidebar';

export default class App extends React.Component {
	render() {
        let children = this.props.children;
		return (
			<Provider store={store}>
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
			</Provider>
		)
	}
}