export function masterSlave(master, slaves) {
	let resolvers = [];

	master().then(
		response =>
			resolvers.forEach(({resolve, end}) => {
				resolve();
				end();
			}),
		error => console.log(error)
	);

	slaves.forEach(({start, end}) => {
		new Promise((resolve, reject) => {
			start();
			resolvers.push({resolve, end});
		})
	});
}
