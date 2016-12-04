import {Component} from 'react';

export default class MetronicComponent extends Component {
	componentWillMount() {
		console.log('MetronicComponent.jsx');

		if(this._componentWillMount) {
			this._componentWillMount();
		}
	}
}