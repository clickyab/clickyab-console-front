export function runMiddleware(middlewares = []) {
	let middles = (function *() {
		let iterator;
		let status;
		for (let i = 0; i < middlewares.length; i++) {
			console.log('here we are dude');
			iterator = middlewares[i]();
			let value = iterator.next().value;
			value.then((response) => {
				console.log(iterator.next(response).value);
			});
		}
	})();
	middles.next();
}