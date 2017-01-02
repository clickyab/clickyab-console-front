import {store} from './redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import { RouteTransition } from 'react-router-transition';
import {Footer} from './components/layouts/Footer';
import {Header} from './components/layouts/HeaderCTR';
import Sidebar from './components/layouts/Sidebar';
import {loading} from "./functions/loading";
import {setHeight} from "./functions/setHeight";

export default class App extends React.Component {
    componentDidMount() {
        loading(false);
        setHeight();
        $(window).resize(function() {
            setHeight();
        })
    }

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
