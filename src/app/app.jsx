import {store} from './redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import { RouteTransition } from 'react-router-transition';
import {Footer} from './components/layouts/Footer';
import {Header} from './components/layouts/Header';
import Sidebar from './components/layouts/Sidebar';
import PageLoading from './components/common/loading-page';
import {loading} from "./functions/loading";

export default class App extends React.Component {
	componentDidMount() {
		loading(false);
	}

	render() {
        let children = this.props.children;
		return (
			<Provider store={store}>
				<div className="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
					<PageLoading/>
					<div className="page-wrapper">
						<Header/>
						<div className="page-container">
							<Sidebar/>
							<div className="page-content-wrapper">
								<RouteTransition
									pathname={this.props.location.pathname}
									atEnter={{ opacity: 0 }}
									atLeave={{ opacity: 0 }}
									atActive={{ opacity: 1 }}

								>
									{children}
								</RouteTransition>
							</div>
						</div>
						<Footer/>
					</div>



				</div>
			</Provider>
		)
	}
}