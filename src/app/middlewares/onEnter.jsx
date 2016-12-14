// let _next = () => {
// };

export function setNext(next) {
	_next = next;
	console.log('hala harchi')
}
export function onEnter() {
	let next;

	return (a, b, c) => {
		next = c;
	}
}

