import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {localeReducer, cssLazyLoader} from 'react-multilingual';
import {loginReducer, userReducer, tokenReducer, registerReducer, impersonateReducer} from './reducers';
import {routerReducer} from 'react-router-redux';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	combineReducers({
		routing: routerReducer,
		impersonate: impersonateReducer,
		token: tokenReducer,
		register: registerReducer,
		login: loginReducer,
		user: userReducer,
		form: formReducer,
		locale: localeReducer('fa', require('../../locales/index').default)
	}),
	undefined,
	enhancer(applyMiddleware(
		cssLazyLoader(['LOCALE_CHANGED'], {
			'en': {
				address: 'css/style-ltr.css',
				direction: 'ltr'
			},
			'fa': {
				address: 'css/style-rtl.css',
				direction: 'rtl'
			}
		})
		)
	)
);