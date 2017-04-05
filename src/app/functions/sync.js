function resolvePromise(promise, iterator) {
	promise.then(
		(response) => {
			let result = iterator.next(response);
			if (!result.done) {
				sync(result.value, iterator);
			}
		},
		error => {
			let result = iterator.next(error);
			if (!result.done) {
				sync(result.value, iterator);
			}
		}
	);
}

function resolveGenerator(generator, iterator) {
	let result = generator.next();


	if (!result.done) {
		sync(result.value, iterator);
	}
}

function resolveSimpleResult(result, iterator) {
	let _result = iterator.next(result);
	if (!_result.done) {
		sync(_result.value, iterator)
	}
}

function callGenerator(generator) {
	if (typeof generator == "function") {
		return generator();
	}

	return generator;
}

function decideOnGeneratorOrPromiseOrSimpleAnswer(result) {
	if (result.next) {
		return {type: "generator", result};
	} else if (result.then) {
		return {type: "promise", result};
	}

	return {type: "result", result};
}

function chooseGenerator(generator, iterator) {
	if (generator.next) {
		return generator;
	}

	return iterator;
}

export function sync(generator, iterator) {
	let {type, result} = decideOnGeneratorOrPromiseOrSimpleAnswer(callGenerator(generator));
	if (type == "generator") {
		resolveGenerator(result, chooseGenerator(result, iterator));
	} else if (type == "promise") {
		resolvePromise(result, chooseGenerator(result, iterator));
	} else if (type == "result") {
		resolveSimpleResult(result, chooseGenerator(result, iterator));
	}
}



