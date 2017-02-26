export function baseUrl() {
	var NODE_ENV = process.env.NODE_ENV;
	if (NODE_ENV !== 'production') {
		return require('./../../../.env').webpack.baseUrl
	} else {
		return window.location.origin;
	}
}