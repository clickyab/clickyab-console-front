import {match} from 'react-router';
export function dispatchableBrowserHistory(browserHistory, store) {
	browserHistory.listenBefore((nextRoute, next) => {
		console.log(match(nextRoute));

		console.log(nextRoute, next);
		setTimeout(()=> {
			next(nextRoute);
		}, 3000);

	});

	return browserHistory;
}

export default store => next => action => {
	if (action.type === 'ROUTE_CHANGED')
		setTimeout(()=> {
			next(action);
		}, 3000);
}
