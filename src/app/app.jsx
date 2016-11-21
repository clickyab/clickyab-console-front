import {store} from './redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import {Index} from './../layouts/Index';


export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Index/>
			</Provider>
		)
	}
}